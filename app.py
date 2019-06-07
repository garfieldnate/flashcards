import base64
from collections import defaultdict
import sqlite3
import sys
import threading

from flask import Flask, jsonify, Response

db_file = None
manifests = None
vocab = None
cats = None
examples = None

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
    result = db.cursor().execute("SELECT id, foreign_word, english_word, pronunciation, pos, frequency, language_id FROM vocab").fetchall()
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

def load_cats():
    global cats
    cats = {}
    db = get_or_create_db()
    result = db.cursor().execute("SELECT * FROM category").fetchall()
    for row in result:
        cats[row['id']] = row

def load_examples():
    global examples
    examples = {}
    db = get_or_create_db()
    result = db.cursor().execute("SELECT id, foreign_text, english_text, language_id FROM example").fetchall()
    for row in result:
        examples.setdefault(row['language_id'], {})
        examples[row['language_id']][row['id']] = row


app = Flask(__name__)


@app.route('/api/v1/manifests')
def manifests():
    return jsonify(manifests)

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

@app.route('/api/v1/vocab/<int:vocab_id>/image')
def vocab_image(vocab_id):
    db = get_or_create_db()
    result = db.cursor().execute(f'SELECT image_base64 FROM vocab WHERE id = {vocab_id};').fetchone()
    # TODO: handle non-existent vocab
    base64text = result['image_base64']
    image = base64.b64decode(base64text)
    return image, 200, {'Content-Type': 'image/jpeg'}

@app.route('/api/v1/vocab/<int:vocab_id>/foreign_audio')
def vocab_foreign_audio(vocab_id):
    db = get_or_create_db()
    result = db.cursor().execute(f'SELECT foreign_audio_base64 FROM vocab WHERE id = {vocab_id};').fetchone()
    # TODO: handle non-existent vocab
    base64text = result['foreign_audio_base64']
    image = base64.b64decode(base64text)
    return image, 200, {'Content-Type': 'audio/mpeg'}

@app.route('/api/v1/example/<int:example_id>/foreign_audio')
def example_foreign_audio(example_id):
    db = get_or_create_db()
    result = db.cursor().execute(f'SELECT foreign_audio_base64 FROM example WHERE id = {example_id};').fetchone()
    # TODO: handle non-existent example
    base64text = result['foreign_audio_base64']
    image = base64.b64decode(base64text)
    return image, 200, {'Content-Type': 'audio/mpeg'}

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
