export default Env;

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
    env.code2Type = (code) => conv_codes[code];

    // throw ni; complete with actual values
    // int or string keys ?
    env.sounds.squares = {
        plain: "plaine",
        woods: "foret",
        cave: "caverne",
        water: "eau",
        castle: "chateau",
        wood_path: "sentier",
        bridge: "pont",
        sand: "sable",
        mountains: "montagne",
        monsters: "monstre",
        boss: "boss",
        boss_final: "boss_final",
        bonus: "bonus",
        sea: "mer",
        castle_gate: "entreechateau",
        magic: "magie",
        funny: "funny",
        border: "border",
        start: "depart",
        end: "fin"
    };
    env.code2sound = (code) => env.sounds.squares[env.code2Type(code)];

    return env;
}
