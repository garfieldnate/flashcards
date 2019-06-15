# TODO

Next: 

* clock display to next set of cards being added
* Continue testing!
* add .editorconfig, install Editorconfig in sublime
* model interface, with mock for testing
* real model class
* model synch with server (PouchDB?)
* TDD the card providers
* color pallette for whole app
* typography for whole app (choose and bundle fonts)
* navigation parameter validation
* validation in general (TypeScript?)
* how to handle assets generally? require() doesn't work with dynamic strings, and we're certainly not going to load thousands of images and audios into memory just in case
* card background pictures
* TypeScript
* Change to AGPL
* Calculate length limit for example sentence display
* Calculate length limit for headword display
* Flashcard data needs to be checked for length limits
* integrate jest-snapshots-svg (couldn't install due to https://github.com/foliojs/font-manager/issues/33)
* 

## Notes

* SwipeRow in native-base does not support `thumbnail`, or in general the same styling as ListItem. Should probably send a PR.
* Icon directory: https://oblador.github.io/react-native-vector-icons/
* Expo does not play well with ESLint: https://github.com/yannickcr/eslint-plugin-react/issues/1955
* Prettier works fine, but I don't know how to integrate it into the project properly.
* Hot reload does not always cause an immediate re-render; I usually have to manually cause one to see the effect of a change in styles, etc.
* Fonts have to be pre-loaded to get correct jest snapshots in Expo: https://github.com/expo/expo/issues/3566. Unfortunately jest currently has no way of defining an async beforeAll across all tests. See https://github.com/facebook/jest/issues/3832.
* 

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

* presentation order should be randomized; should not allow user to be primed by previous patterns
* failed first time cards should not be placed in the back of the stack
