export default env;

const env = {
    // square codes
    codes: {},
    // music names
    musics: {},
    // trying to make a modular (easily extensible) rules system
    rules: {
        move: {
            // determine wether you can move or not or what happens when you try to leave, ...
            pre: {},
            // when you try to leave, the square may hurt you, ...
            post: {},
            // static effects when staying on the case
            none: {}
        }
    },
    rules_data: {}
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

/* --- move.pre --- */

/* nogo */
env.rules_data.nogo = new Set([
    env.codes.mountains,
    env.codes.border
]);

env.rules.move.pre.nogo = function (world, dest_square) {
    // throw ni;
    if (env.rules_data.nogo.has(dest_square.type))
        return false;
    else
        return true;
};
