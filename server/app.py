import base64
from collections import defaultdict
import sqlite3
import sys
import threading
import urllib

from flask import Flask, jsonify, Response, url_for, redirect

app = Flask(__name__)

db_file = None
manifests = None
vocab = None
beginner_vocab = None
cats = None
examples = None

lang_to_beginner_cats = {
    # beginner phrases for Thai
    1: set([76, 77, 78])
}
lang_to_deck_thumbnail = {
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Thailand_%28non-standard_colours_2%29.svg/120px-Flag_of_Thailand_%28non-standard_colours_2%29.svg.png'
}

thread_local_data = threading.local()

# We use regular dictionaries instead of Sqlite3.Row because they can be used with cursor.execute()
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def get_or_create_db():
    if getattr(thread_local_data, 'cursor', None) is None:
        thread_local_data.db = sqlite3.connect(str(db_file))
        thread_local_data.db.row_factory = dict_factory
    return thread_local_data.db

# Methods for initial server loading

def load_manifests():
    db = get_or_create_db()
    global manifests
    manifests = db.cursor().execute("SELECT l.english_name, l.id, count(*) as numVocab FROM vocab JOIN language l GROUP BY language_id").fetchall()

def load_vocab():
    global vocab
    vocab = {}
    db = get_or_create_db()
    result = db.cursor().execute("SELECT id, foreign_word, english_word, pronunciation, pos, frequency, language_id, foreign_audio_id, image_id FROM vocab").fetchall()
    for row in result:
        vocab.setdefault(row['language_id'], {})
        row['cats'] = []
        row['examples'] = []
        vocab[row['language_id']][row['id']] = row

    result = db.cursor().execute('SELECT v.language_id, v.id vocab_id, c2v.cat_id FROM cat_2_vocab c2v JOIN vocab v ON v.id = c2v.vocab_id').fetchall()
    for row in result:
        vocab[row['language_id']][row['vocab_id']]['cats'].append(row['cat_id'])

    result = db.cursor().execute('SELECT v.language_id, v.id vocab_id, e2v.example_id FROM example_2_vocab e2v JOIN vocab v ON v.id = e2v.vocab_id').fetchall()
    for row in result:
        vocab[row['language_id']][row['vocab_id']]['examples'].append(row['example_id'])

    determine_beginner_vocab()

def determine_beginner_vocab():
    global vocab;
    global beginner_vocab;
    beginner_vocab = {};
    for lang_id, cats in lang_to_beginner_cats.items():
        beginner_vocab[lang_id] = [];
        for vid, v in vocab[lang_id].items():
            if cats & set(v['cats']):
                beginner_vocab[lang_id].append(vid)

def load_cats():
    global cats
    cats = {}
    db = get_or_create_db()
    result = db.cursor().execute("SELECT * FROM category ORDER BY id").fetchall()
    # skip ROOT
    result.pop(0)
    for row in result:
        cats[row['id']] = row

def load_examples():
    global examples
    examples = {}
    db = get_or_create_db()
    result = db.cursor().execute("SELECT id, foreign_text, english_text, foreign_audio_id, language_id FROM example").fetchall()
    for row in result:
        examples.setdefault(row['language_id'], {})
        examples[row['language_id']][row['id']] = row


# Thanks to John Jiang: https://stackoverflow.com/a/22651263/474819
@app.route("/endpoints")
def endpoints():
    output = []
    for rule in sorted(app.url_map.iter_rules(), key=lambda r: r.endpoint):
        methods = ','.join(rule.methods)
        output.append({
            "endpoint": str(rule),
            "methods": ','.join(rule.methods),
        });

    return jsonify(output)


@app.route('/api/v1/manifests')
def manifests():
    return jsonify(manifests)

@app.route('/api/v1/lang/<int:lang_id>/thumbnail')
def deck_thumbnail(lang_id):
    return redirect(lang_to_deck_thumbnail[lang_id], code=302)

@app.route('/api/v1/lang/<int:lang_id>/vocab')
def all_vocab(lang_id):
    # TODO: check for bad lang id
    return jsonify(vocab[lang_id])

@app.route('/api/v1/cats')
def all_cats():
    # TODO: check for bad lang id
    return jsonify(cats)

@app.route('/api/v1/lang/<int:lang_id>/examples')
def all_examples(lang_id):
    # TODO: check for bad lang id
    return jsonify(examples[lang_id])

def binary_resource(resource_type, resource_id, mimetype):
    db = get_or_create_db()
    result = db.cursor().execute(f'SELECT * FROM {resource_type} WHERE id = {resource_id}').fetchone()
    base64text = result[f'{resource_type}_base64']
    resource = base64.b64decode(base64text)
    return resource, 200, {'Content-Type': mimetype}

@app.route('/api/v1/image/<int:image_id>')
def image(image_id):
    return binary_resource('image', image_id, 'image/jpeg')

@app.route('/api/v1/audio/<int:audio_id>')
def audio(audio_id):
    return binary_resource('audio', audio_id, 'audio/mpeg')

@app.route('/api/v1/lang/<int:lang_id>/initial_vocab')
def initial_vocab(lang_id):
    """Return the first 10 beginner vocab objects"""
    initial_vocab_ids = list(beginner_vocab[lang_id][:10])
    values = [vocab[lang_id][vid] for vid in initial_vocab_ids]
    print(values)
    return jsonify(values)

if __name__ == '__main__':
    db_file = sys.argv[1]
    load_manifests()
    print(f'Manifests: {manifests}')
    load_vocab()
    load_cats()
    load_examples()
    # print(vocab)
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True)
