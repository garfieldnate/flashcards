# Flashcard App

## Running the Server

    cd server
    pip3 install -r requirements.txt
    python3 app.py <path to database>

The server will run at localhost:5000.

## Running the client

You need to generate some of the assets first. This requires the server to be running.

    cd client/scripts
    pip3 install -R requirements.txt
    python3 client/scripts/init_cards.py http://localhost:5000

Then you need to generate even more assets:

    yarn schemata2ts

TODO: migrate the python script to TypeScript and put all generation into one command (use some hook like postinstall?)

After that you should install dependencies and run the app with expo:

    cd client
    yarn
    expo start

## Other Stuff

- `yarn test`: run unit tests
- `yarn prettier`: format all of the tyescript files
- `yarn tsc`: typecheck all of the typescript files
- `fix-jest-expo`: you may need to run this if the tests don't work for a mysterious reason
