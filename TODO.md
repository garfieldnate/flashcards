# TODO

Next: TDD the card providers, or research flexbox and fix issues with card design

* color pallette for whole app
* typography for whole app
* navigation parameter validation
* validation in general (TypeScript?)
* Design everywhere!
* Overlay image on card swipes
* TypeScript
* Change to AGPL

## Issues

* If second line of headword is too long, it is simply not shown
* there's probably a more elegant flexboxy way to format the card
* example text and container View component overflow bottom of card

## Notes

* Testing via Jest does not work with native-base components. See thread in https://nativebase.slack.com/archives/C2XDREYSJ/p1547992457022900.
* Expo does not play well with ESLint: https://github.com/yannickcr/eslint-plugin-react/issues/1955
* Prettier works fine, but I don't know how to integrate it into the project properly.
* Hot reload does not always cause an immediate re-render; I usually have to manually cause one to see the effect of a change in styles, etc.

## Color Pallete

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

srs notes:

* presentation order should be randomized; should not allow user to be primed by previous patterns
* failed first time cards should not be placed in the back of the stack
