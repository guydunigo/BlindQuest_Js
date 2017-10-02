export default Env;

import opts from "../../config.js";

// returns an object with switched keys/values 
const reverseObj = function (inObj) {
    const res = {};

    Object.keys(inObj).forEach(function (elmt) {
        res[inObj[elmt]] = elmt;
    });

    return res;
}

const Env = function () {
    const env = {
        // square codes
        codes: {},
        code2Type: undefined,
        // Effect sounds and music names
        sounds: {
            squares: {},
            effects: {}
        },
        code2sound: undefined
    };

    /* ------ codes ------ */
    env.codes = opts.ENV.CODES;

    const conv_codes = reverseObj(env.codes);
    env.code2Type = (code) => conv_codes[code];

    // throw ni; complete with actual values
    // int or string keys ?
    env.sounds.squares = opts.ENV.SOUNDS;
    env.code2sound = (code) => env.sounds.squares[env.code2Type(code)];

    return env;
}
