import base64
import sqlite3
import sys
import threading

from flask import Flask, jsonify, Response

db_file = None
manifests = None

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

def load_manifests():
    db = get_or_create_db()
    global manifests
    manifests = db.cursor().execute("SELECT l.english_name, l.id, count(*) as numVocab FROM vocab JOIN language l GROUP BY language_id").fetchall()


app = Flask(__name__)


@app.route('/api/v1/manifests')
def manifests():
    return jsonify(manifests)

@app.route('/api/v1/lang/<int:lang_id>/vocab')
def all_vocab(lang_id):
    db = get_or_create_db()
    result = db.cursor().execute(f'select foreign_word, english_word, pronunciation, pos from vocab where language_id = {lang_id}').fetchall()
    # Next: pre-compute this result, and also add vocab2cat and vocab2example information
    return jsonify(result)

@app.route('/api/v1/vocab/<int:vocab_id>/image')
def vocab_image(vocab_id):
    db = get_or_create_db()
    result = db.cursor().execute(f'select image_base64 from vocab where id = {vocab_id};').fetchone()
    # TODO: handle non-existent vocab
    base64text = result['image_base64']
    image = base64.b64decode(base64text)
    return image, 200, {'Content-Type': 'image/jpeg'}

@app.route('/api/v1/vocab/<int:vocab_id>/foreign_audio')
def vocab_foreign_audio(vocab_id):
    db = get_or_create_db()
    result = db.cursor().execute(f'select foreign_audio_base64 from vocab where id = {vocab_id};').fetchone()
    # TODO: handle non-existent vocab
    base64text = result['foreign_audio_base64']
    image = base64.b64decode(base64text)
    return image, 200, {'Content-Type': 'audio/mpeg'}

@app.route('/api/v1/example/<int:example_id>/foreign_audio')
def example_foreign_audio(example_id):
    db = get_or_create_db()
    result = db.cursor().execute(f'select foreign_audio_base64 from example where id = {example_id};').fetchone()
    # TODO: handle non-existent example
    base64text = result['foreign_audio_base64']
    image = base64.b64decode(base64text)
    return image, 200, {'Content-Type': 'audio/mpeg'}

if __name__ == '__main__':
    db_file = sys.argv[1]
    load_manifests()
    print(manifests)
    app.run()
