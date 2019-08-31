// Run like this: yarn ts-node --log-error scripts/update_couch_from_sqlite.ts localhost:5000 http://localhost:5984
import { CardSchema } from '../src/db/schemata/card';
import {
  FLASHCARDS_DB_NAME,
  FOREIGN_HEADWORD_AUDIO_ATTACHMENT,
  IMAGE_ATTACHMENT,
} from '../src/db/schemata/constants';

import * as got from 'got';

// plan:
// * read data from sqlite or server
// * create ../src/db/schemata/cards.ts objects
// * send new or updated object to couchDB
// * then send new or updated attachments

const main = async (serverURL: string, couchURL: string) => {
  await createCouchDb(couchURL);

  const vocabData = await downloadVocab(serverURL);
  console.log('Downloaded vocab data');

  const catsData = await downloadCats(serverURL);
  console.log('Downloaded category data');

  const examplesData = await downloadExamples(serverURL);
  console.log('Downloaded example data');

  const cards = createCards(vocabData, catsData, examplesData);
  console.log('Created card data for uploading');

  await uploadCards(couchURL, cards);
  console.log('Finished uploading card text data');

  await copyBinaryResources(vocabData, serverURL, couchURL);
  console.log('Finished copying binary resources');
};

async function createCouchDb(couchURL: string) {
  const createEndpoint = `${couchURL}/${FLASHCARDS_DB_NAME}`;
  try {
    await got.put(createEndpoint);
    console.log('Created DB');
  } catch (error) {
    if (error.body && error.body.includes('the file already exists')) {
      console.log('DB already exists.');
    } else {
      throw error;
    }
  }
}

const getDocId = (vocabId: string) => {
  // TODO: only works for thai
  return `thai-${vocabId}`;
};

async function downloadVocab(serverURL: string) {
  // TODO: for now, only does one language
  const vocabEndpoint = `${serverURL}/api/v1/lang/1/vocab`;
  const vocabResponse = await got(vocabEndpoint, {
    json: true,
    protocol: 'http:',
  });
  return vocabResponse.body;
}

async function downloadCats(serverURL: string) {
  const catsEndpoint = `${serverURL}/api/v1/cats`;
  const catsResponse = await got(catsEndpoint, {
    json: true,
    protocol: 'http:',
  });
  return catsResponse.body;
}

async function downloadExamples(serverURL: string) {
  // TODO: for now, only does one language
  const examplesEndpoint = `${serverURL}/api/v1/lang/1/examples`;
  const examplesResponse = await got(examplesEndpoint, {
    json: true,
    protocol: 'http:',
  });
  return examplesResponse.body;
}

const createCards = (vocabData, catsData, examplesData) => {
  const cards = [];
  for (const [vocabId, vocab] of Object.entries(vocabData)) {
    // just the first category
    const firstCatId = String(vocab.cats[0]);
    const card: CardSchema = {
      id: getDocId(vocabId),
      headwordUserLang: {
        english: vocab.english_word,
      },
      headwordForeignLang: vocab.foreign_word,
      category: catsData[firstCatId].name,
    };
    if (vocab.pronunciation) {
      card.pronunciation = vocab.pronunciation;
    }
    if (vocab.examples.length) {
      // just the first example
      const firstExampleId = String(vocab.examples[0]);
      card.exampleForeignLang = examplesData[firstExampleId].foreign_text;
      card.exampleUserLang = {
        english: examplesData[firstExampleId].english_text,
      };
    }
    cards.push(card);
  }
  return cards;
};

async function uploadCards(couchURL: string, cards: CardSchema[]) {
  for (const card of cards) {
    const createEndpoint = `${couchURL}/${FLASHCARDS_DB_NAME}/${card.id}`;
    try {
      await got.put(createEndpoint, {
        body: card,
        json: true,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
    console.log(`Uploaded card text ${card.id}`);
  }
}

async function copyBinaryResources(
  vocabData: any,
  serverURL: string,
  couchURL: string
) {
  for (const [vocabId, vocab] of Object.entries(vocabData)) {
    const docId = getDocId(vocab.id);
    if ('foreign_audio_id' in vocab) {
      const docRev = await getDocRevision(couchURL, docId);
      const audioURL = `${serverURL}/api/v1/audio/${vocab.foreign_audio_id}`;
      const attachAudioURL = `${couchURL}/${FLASHCARDS_DB_NAME}/${docId}/${FOREIGN_HEADWORD_AUDIO_ATTACHMENT}?rev=${docRev}`;
      try {
        const audioData = (await got(audioURL, {
          protocol: 'http:',
          encoding: null,
        })).body;

        const audioResponse = await got.put(attachAudioURL, {
          body: audioData,
          headers: { 'Content-Type': 'audio/mpeg' },
          protocol: 'http:',
          encoding: null,
        });
        console.log('Updated audio for doc ' + docId);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    if ('image_id' in vocab) {
      const docRev = await getDocRevision(couchURL, docId);
      const imageURL = `${serverURL}/api/v1/image/${vocab.image_id}`;
      const attachImageURL = `${couchURL}/${FLASHCARDS_DB_NAME}/${docId}/${IMAGE_ATTACHMENT}?rev=${docRev}`;
      try {
        const audioData = (await got(imageURL, {
          protocol: 'http:',
          encoding: null,
        })).body;

        const audioResponse = await got.put(attachImageURL, {
          body: audioData,
          headers: { 'Content-Type': 'image/png' },
          protocol: 'http:',
          encoding: null,
        });
        console.log('Updated image for doc ' + docId);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
}

async function getDocRevision(couchURL: string, docID: string) {
  const docURL = `${couchURL}/${FLASHCARDS_DB_NAME}/${docID}`;
  try {
    return (await got(docURL, { protocol: 'http:', json: true })).body._rev;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

if (require.main === module) {
  if (process.argv.length !== 4) {
    throw new Error(
      'Usage: ts-node update_couch_from_sqlite.ts <vocab_url> <couch_url>'
    );
  }
  main(process.argv[2], process.argv[3]);
}
