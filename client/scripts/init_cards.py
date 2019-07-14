# Usage: python3 init_cards.py <server_URL> (probably http://localhost:5000)
from pathlib import Path
import shutil
from string import Template
import sys
import re

import requests

script_dir = Path(__file__).parents[0].resolve()

cards_file_template = Template(
    """
// Generated automatically with init_cards.py. EDITS WILL BE LOST!
import { BuiltinCardData } from './BuiltinCard';
const cards: BuiltinCardData[] = [
  $cards
];

export default cards;
""")

card_template = Template(
    """  {
    ID: '$lang-$id',
    category: '$category',
    exampleForeignLang: '$exampleForeignLang',
    exampleUserLang: '$exampleUserLang',
    foreignHeadwordAudio: require('../../assets/deckPreviews/sounds/$lang/headword_foreign_$id.mp3'),
    headwordForeignLang: '$foreign_word',
    headwordUserLang: '$english_word',
    image: require('../../assets/deckPreviews/images/$lang/$id.png'),
  },
""")


def escape_quotes(s):
    return s.replace("'", "\\'")


def card_to_js(vocab, lang):
    for key, value in vocab.items():
        if isinstance(value, str):
            vocab[key] = escape_quotes(value)

    s = card_template.substitute(vocab, lang=lang['english_name'].lower())
    # remove empty fields
    s = re.sub(r".*''.*\n", '', s)
    if 'foreign_audio_id' not in vocab:
        s = re.sub('.*foreignHeadwordAudio.*\n', '', s)
    # print(s)
    return s


def decks_to_js(langs, presentation_order):
    lines = []
    lines.append(
        "// Generated automatically with init_cards.py. EDITS WILL BE LOST!")
    lines.append("import { IDeckInfo } from '../model/Deck';")
    lines.append("import BuiltinCard from './BuiltinCard';")
    for lang in langs:
        name = lang['english_name'].lower()
        lines.append(f"import {name}Deck from './cards-{name}'")
    lines.append(
        "// we have to explicitly require all of our files; dynamic require will not compile with Expo :(")
    lines.append("const decks: IDeckInfo[] = [")
    for lang in langs:
        name = lang['english_name']
        po = [f'{name.lower()}-{vid}' for vid in presentation_order[lang['id']]]
        lines.append("  {")
        lines.append(f"    ID: '{name.lower()}',")
        lines.append(
            f"    builtinCards: {name.lower()}Deck.map((c) => new BuiltinCard(c)),")
        lines.append("    getPresentationOrder() {")
        lines.append(f"      return {po};")
        lines.append("    },")
        lines.append(f"    name: '{name}',")
        lines.append(
            f"    thumbnail: require('../../assets/deckPreviews/images/{name.lower()}/thumbnail.png'),")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export default decks;")
    lines.append("")

    return "\n".join(lines)


def get_manifests(server_url):
    return requests.get(server_url + '/api/v1/manifests').json()


def get_initial_vocab(server_url, lang_id):
    vocab = requests.get(
        server_url + f'/api/v1/lang/{lang_id}/initial_vocab').json()

    cats = requests.get(server_url + f'/api/v1/cats').json()
    for v in vocab:
        first_cat_id = str(v['cats'][0])
        v['category'] = cats[first_cat_id]['name']

    examples = requests.get(
        server_url + f'/api/v1/lang/{lang_id}/examples').json()
    # print(examples)
    for v in vocab:
        v['exampleForeignLang'] = ''
        v['exampleUserLang'] = ''
        if v['examples']:
            v['exampleForeignLang'] = examples[str(
                v['examples'][0])]['foreign_text']
            v['exampleUserLang'] = examples[str(
                v['examples'][0])]['english_text']

    return vocab


def get_presentation_order(server_url, lang_id):
    ids = requests.get(
        server_url + f'/api/v1/lang/{lang_id}/presentation_order').json()
    return ids


def write_vocab_file(vocab, lang):
    cards_string = ''.join(card_to_js(v, lang) for v in vocab)
    cards_file_string = cards_file_template.substitute(cards=cards_string)
    file_name = script_dir.parent.parent.joinpath(
        'client', 'src', 'builtinData', 'cards-' + lang['english_name'].lower() + '.ts')
    file_name.parent.mkdir(parents=True, exist_ok=True)
    with open(file_name, 'w') as f:
        f.write(cards_file_string)
    print(f'wrote {file_name}')


def download_resources(server_url, vocab, lang):
    deck_assets_dir = image_dir = script_dir.parent.parent.joinpath(
        'client', 'assets', 'deckPreviews')

    audio_dir = deck_assets_dir.joinpath(
        'sounds', lang['english_name'].lower())
    audio_dir.mkdir(parents=True, exist_ok=True)
    for v in vocab:
        audio_id = v['foreign_audio_id']
        if not audio_id:
            continue
        response = requests.get(
            server_url + f'/api/v1/audio/{audio_id}', stream=True)
        file_name = audio_dir.joinpath(f'headword_foreign_{v["id"]}.mp3')
        with open(file_name, 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
            print(f'wrote {file_name}')

    image_dir = deck_assets_dir.joinpath(
        'images', lang['english_name'].lower())
    image_dir.mkdir(parents=True, exist_ok=True)
    for v in vocab:
        image_id = v['image_id']
        if not image_id:
            continue
        response = requests.get(
            server_url + f'/api/v1/image/{image_id}', stream=True)
        file_name = image_dir.joinpath(f'{v["id"]}.png')
        with open(file_name, 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
            print(f'wrote {file_name}')

    # get deck thumbnail
    response = requests.get(
        server_url + f'/api/v1/lang/{lang["id"]}/thumbnail', stream=True)
    file_name = image_dir.joinpath('thumbnail.png')
    with open(file_name, 'wb') as out_file:
        shutil.copyfileobj(response.raw, out_file)
        print(f'wrote {file_name}')


def write_decks_file(langs, presentation_order):
    decks_string = decks_to_js(langs, presentation_order)
    file_name = script_dir.parent.parent.joinpath(
        'client', 'src', 'builtinData', 'BuiltinDecks.ts')
    file_name.parent.mkdir(parents=True, exist_ok=True)
    with open(file_name, 'w') as f:
        f.write(decks_string)
        print(f'wrote {file_name}')


def main(args):
    server_url = args[0]
    langs = get_manifests(server_url)
    presentation_order = {}
    for lang in langs:
        vocab = get_initial_vocab(server_url, lang['id'])
        write_vocab_file(vocab, lang)
        download_resources(server_url, vocab, lang)
        presentation_order[lang['id']] = get_presentation_order(
            server_url, lang['id'])

    write_decks_file(langs, presentation_order)


if __name__ == '__main__':
    main(sys.argv[1:])
