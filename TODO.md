# TODO

Current: when the user selects a deck, the beginner vocab is downloaded from the server immediately

Game plan:

- StudyManager should be permanent object created and stored globally for all decks user is studying. Then we can keep track of the number of cards due and also display it.
- StudyManager tracks number of cards due in an instance variable subscribed to all card schedulers. registerStudyResult() function minuses a card, streams plus a card.

Continuing:

- run without DB cards to make sure everything works
- Create one textual card on server and display it
- Create one card image/audio on server and display it
- (Script to) dump SQLite DB into couchDB
- Script to dump card previews from couchDB to builtinData
- when user adds a deck, connect to DB and start downloading
- display downloaded cards after the builtin ones (new NewCardProvider)
- make sure DB is read-only!
- dockerize DB setup
- ?fork or do whatever it takes to get SQLite version working?

How it works:

- use web async storage plugin; the RN sqlite one from crazy dog doesn't work with Expo
- use http plugin
- polyfill FileReader.readAsArrayBuffer
- Sqlite adapter would be faster, but this is what we have to work with for now. So many bugs in this thing!

### Bugs

- Await for resolution of https://github.com/alexbrillant/react-native-deck-swiper/pull/245. Until then, we have to patch react-native-deck-swiper with the following:

      	static getDerivedStateFromProps(props, state) {
      	if (props.cards !== state.cards) {
      		return {
      		cards: props.cards,
      		...calculateCardIndexes(props.cardIndex, props.cards),
      		};
      	}
      	// no state change
      	return null;
      	}

### User Stories

- The decks the user selected are saved permanently/available offline
- Which decks the user selected are backed up to a server
- When the user reviews a card, the result is saved permanently
- Review data is backed up to a server
- The review schedule is adjusted based on previous review results (detailed stories are TODO)
- the number of cards due is displayed in the upper right header of StudyScreen
- deleting a card makes it not come back forever
- When there are no cards that need to be reviewed, the review screen shows a clock counting down to the next review time.
- Multi-user support (detailed stories are TODO)
- When a deck is downloaded, the deck styling is also downloaded and used for card display (test with Thai, which needs a bigger font and probably a specific font)
- An image associated with a card is shown as its background.
- When a card is displayed and the image is too small or too big in one dimension, the picture is scaled gracefully and a background coloring is applied to the empty space
- User can undo last card swipe

#### Milestones

- Thai deck is downloadable
- review and deck data is saved and backed up
- multi-user support/login

### Developer Stories

- travis integration

### Data Stories

- For a supported language:
- We have a good list of ~3000 high-frequency words for beginners
- We have a list of 50 basic phrases for beginners
- We have a list of culture/country-specific words (food, holidays, parts of a house)
- Shortcut for future: permanent cross-linguistic category words (occupations, household items, vehicles)
- The words have categories
- The words have recordings
- The words have example sentences
- The words have high quality images associated with them

General TODOs:

- send PR to get current side from CardFlip. Ask for a release, too :)
- how to handle assets generally? require() doesn't work with dynamic strings, and we're certainly not going to load thousands of images and audios into memory just in case
- Calculate length limit for example sentence display
- Calculate length limit for headword display
- Flashcard data needs to be checked for length limits
- update and release my own fork of jest-snapshots-svg; only have PNG support, make usage ergonomic.

### Design Stories

- Add explicit styling for headers (see how number of cards is not vertically aligned with the rest of the header in StudyScreen?)
- Flag thumbnails should be shaped like the flag (not square)
- Better background image for cards without an associated image
- Better background image for stage background
- Unified color pallette for whole app
- Unified typography for whole app

## Notes

- Could turn unhandled promise rejections into errors:

      	import RejectionTracking from 'promise/setimmediate/rejection-tracking';

      	let db

      	RejectionTracking.enable({
      		allRejections: true,
      		onUnhandled: (id, error = {}) => {
      		console.error(error)
      		},
      		onHandled: () => {},
      	})

- Inline type annotations for TypeScript don't exist. Follow https://github.com/microsoft/TypeScript/issues/7481 to see when we can remove our workarounds (`asChooseStudyDeckScreenProps()`, etc.)
- I really dislike Prettier putting JSX atts on the same line. It's much easier to read them quickly in a column. Watching https://github.com/prettier/prettier/issues/3101. Why the heck does it put import destructuring in columns but JSX atts all on one line?
- Linting doesn't work if you call a file Types.ts, DataTypes.ts, etc. I got "cannot find file Datapes" when I tried that second one.
- Update jest-expo-preset once this PR is released with it: https://github.com/expo/expo/pull/4520/commits/bbbe9e2603d6713ebc2b98ec330af825811296fd.
- Icon directory: https://oblador.github.io/react-native-vector-icons/
- Expo does not play well with ESLint: https://github.com/yannickcr/eslint-plugin-react/issues/1955
- Hot reload does not always cause an immediate re-render; I usually have to manually cause one to see the effect of a change in styles, etc.
- Fonts have to be pre-loaded to get correct jest snapshots in Expo: https://github.com/expo/expo/issues/3566. Unfortunately jest currently has no way of defining an async beforeAll across all tests. See https://github.com/facebook/jest/issues/3832.
-

## Color Pallete

### Card swipe colors

    /* Coolors Exported Palette - http://coolors.co/53a548-eee82c-d13800-337ca0-3ec300 */

    /* HSL */
    $color1: hsla(113%, 39%, 46%, 1);
    $color2: hsla(58%, 85%, 55%, 1);
    $color3: hsla(16%, 100%, 41%, 1);

    /* RGB */
    $color1: rgba(83, 165, 72, 1);
    $color2: rgba(238, 232, 44, 1);
    $color3: rgba(209, 56, 0, 1);

### Colors for rest of the app

    /* Coolors Exported Palette - http://coolors.co/1a5493-ffad05-eee82c-91cb3e-53a548 */

    /* HSL */
    $color1: hsla(211%, 70%, 34%, 1);
    $color2: hsla(40%, 100%, 51%, 1);
    $color3: hsla(58%, 85%, 55%, 1);
    $color4: hsla(85%, 58%, 52%, 1);
    $color5: hsla(113%, 39%, 46%, 1);

    /* RGB */
    $color1: rgba(26, 84, 147, 1);
    $color2: rgba(255, 173, 5, 1);
    $color3: rgba(238, 232, 44, 1);
    $color4: rgba(145, 203, 62, 1);
    $color5: rgba(83, 165, 72, 1);

Nice gray for header: #233D4D (Japanese Indigo)

srs notes:

- presentation order should be randomized; should not allow user to be primed by previous patterns
- failed first time cards should not be placed in the back of the stack
