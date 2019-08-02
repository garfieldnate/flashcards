# TODO

Current:

- when the user selects a deck, the beginner vocab is downloaded from the server immediately

Continuing:

- Cleanup from bug searching
- check if we can remove the jest-expo patch
- (Script to) dump SQLite DB into couchDB
- Script to dump card previews from couchDB to builtinData
- when user adds a deck, connect to DB and start downloading
- make sure DB is read-only!
- dockerize DB setup
- ?fork or do whatever it takes to get SQLite version working?


How it works:

- use web async storage plugin; the RN sqlite one from crazy dog doesn't work with Expo
- use http plugin
- polyfill FileReader.readAsArrayBuffer
- Sqlite adapter would be faster, but this is what we have to work with for now. So many bugs in this thing!

### Bugs

- Await for resolution of https://github.com/alexbrillant/react-native-deck-swiper/pull/245. Until then, we have to patch react-native-deck-swiper (done automatically with postinstall hook)
- Also awaiting update of jest-expo (https://github.com/expo/expo/issues/4503). Fixed via postinstall hook.
- VSCode Expo debug setup: https://github.com/microsoft/vscode-react-native/issues/1060.

### User Stories

- An image associated with a card is shown as its background.
- The decks the user selected are saved permanently/available offline
- Which decks the user selected are backed up to a server
- When the user reviews a card, the result is saved permanently
- Review data is backed up to a server
- The review schedule is adjusted based on previous review results (detailed stories are TODO)
- deleting a card makes it not come back forever
- When there are no cards that need to be reviewed, the review screen shows a clock counting down to the next review time.
- Multi-user support (detailed stories are TODO) - SuperLogin - pass auth settings as pouchSettings to RxDatabase.collection()
- When a deck is downloaded, the deck styling is also downloaded and used for card display (test with Thai, which needs a bigger font and probably a specific font)
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

- Real UI/styling for "some cards could not be retrieved" notice (similar to AddDeckNotice in style)
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
