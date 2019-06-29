# Flashcard App

## Running the Server

    cd server
    pip3 install -R requirements.txt
    python3 app.py <path to database>

The server will run at localhost:5000.

## Running the client

You need to generate some of the assets first. This requires the server to be running.

    cd client/scripts
    pip3 install -R requirements.txt
    python3 client/scripts/init_cards.py http://localhost:5000

After that you should install dependencies and run the app with expo:

    cd client
    yarn
    expo start

