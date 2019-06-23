# TODO

Current:

### Bugs

- Leaving the study deck screen causes the number of cards to decrease or go to 0

### User Stories

- the AddStudyDeck screen shows the decks available from the server
- decks available from the server are saved permanently
- decks available from the server are updated once in a while
- when the user selects a deck, the beginner vocab is downloaded from the server immediately
- The decks the user selected are saved permanently
- The decks the user selected are backed up to a server
- The data the user downloaded is available offline
- When the user reviews a card, the result is saved permanently
- Review data is backed up to a server
- The review schedule is adjusted based on previous review results (detailed stories are TODO)
- When there are no cards that need to be reviewed, the review screen shows a clock counting down to the next review time.
- The first time a card is shown, the user is given the option to skip the card (confirm first)
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

- types are used everywhere
- research using MST in place of adding @observer and <Observer> where needed
- Add storybook

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

- Continue testing!
- model interface, with mock for testing
- real model class
- model synch with server (PouchDB?)
- TDD the card providers
- color pallette for whole app
- typography for whole app (choose and bundle fonts)
- navigation parameter validation
- validation in general (TypeScript?)
- how to handle assets generally? require() doesn't work with dynamic strings, and we're certainly not going to load thousands of images and audios into memory just in case
- card background pictures
- Calculate length limit for example sentence display
- Calculate length limit for headword display
- Flashcard data needs to be checked for length limits
- integrate jest-snapshots-svg (couldn't install due to https://github.com/foliojs/font-manager/issues/33)

### Design Stories

- Add explicit styling for headers (see how number of cards is not vertically aligned with the rest of the header in StudyScreen?)
- Flag thumbnails should be shaped like the flag (not square)
- Better background image for cards without an associated image
- Better background image for stage background

## Notes

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

    /* Coolors Exported Palette - coolors.co/53a548-eee82c-d13800-337ca0-3ec300 */

    /* HSL */
    $color1: hsla(113%, 39%, 46%, 1);
    $color2: hsla(58%, 85%, 55%, 1);
    $color3: hsla(16%, 100%, 41%, 1);

    /* RGB */
    $color1: rgba(83, 165, 72, 1);
    $color2: rgba(238, 232, 44, 1);
    $color3: rgba(209, 56, 0, 1);

### Colors for rest of the app

    /* Coolors Exported Palette - coolors.co/1a5493-ffad05-eee82c-91cb3e-53a548 */

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
