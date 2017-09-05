export default loadEnv;

import loadRules from "./rules/Rules.js"

// returns an object with switched keys/values 
const reverseObj = function (inObj) {
    const res = {};

    Object.keys(inObj).forEach(function (elmt) {
        res[inObj[elmt]] = elmt;
    });

    return res;
}

const loadEnv = function (bq) {
    const env = bq.world.env = {
        // square codes
        codes: {},
        codeToType: undefined,
        // Effect sounds and music names
        sounds: {
            squares: {},
            effects: {}
        },
        rules: {}
    };

    /* ------ codes ------ */
    env.codes = {
        plain: 0,
        woods: 1,
        cave: 2,
        water: 3,
        castle: 4,
        wood_path: 5,
        bridge: 6,
        sand: 7,
        mountains: 8,
        monsters: 10,
        boss: 11,
        boss_final: 12,
        bonus: 13,
        sea: 14,
        castle_gate: 15,
        magic: 16,
        funny: 17,
        border: 97,
        start: 98,
        end: 99
    };

    const conv_codes = reverseObj(env.codes);
    env.codeToType = (code) => conv_codes[code];

    // throw ni; complete with actual values
    // int or string keys ?
    env.sounds.squares = {
        plain: "plain",
        woods: "woods",
        cave: "cave",
        water: "water",
        castle: "castle",
        wood_path: "wood_path",
        bridge: "bridge",
        sand: "sand",
        mountains: "mountains",
        monsters: "monsters",
        boss: "boss",
        boss_final: "boss_final",
        bonus: "bonus",
        sea: "sea",
        castle_gate: "castle_gate",
        magic: "magic",
        funny: "funny",
        border: "border",
        start: "start",
        end: "end"
    };

    bq.interface.audio.loadSounds(env.sounds);

    loadRules(bq);

    return env;
}
