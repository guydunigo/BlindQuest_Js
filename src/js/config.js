// To json

// Will contain all environment codes, music filenames, their behaviour, player infos, ...

export const ENV = {
    CODES: {
        plain: 0,
        woods: 1,
        cave: 2,
        water: 3,
        castle: 4,
        wood_path: 5,
        bridge: 6,
        sand: 7,
        mountains: 8,
        monster: 10,
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
    },
    SOUNDS: {
        plain: "plaine",
        woods: "foret",
        cave: "caverne",
        water: "eau_short",
        castle: "chateau",
        wood_path: "sentier",
        bridge: "pont",
        sand: "sable",
        mountains: "montagne",
        monster: "monstre",
        boss: "monstre",
        boss_final: "boss_final",
        bonus: "bonus",
        sea: "mer",
        castle_gate: "entreechateau",
        magic: "magie",
        funny: "funny",
        border: "border",
        start: "depart",
        end: "depart"
    },
    COLORS: {
        plain: "rgb(150,175,10)",
        woods: "rgb(0,100,0)",
        cave: "rgb(100,50,0)",
        water: "rgb(0,0,255)",
        castle: "rgb(150,150,150)",
        wood_path: "rgb(10,200,0)",
        bridge: "rgb(100,50,0)",
        sand: "rgb(255,255,0)",
        mountains: "rgb(50,10,0)",
        monster: "rgb(200,200,0)",
        boss: "rgb(100,100,0)",
        boss_final: "rgb(255,0,0)",
        bonus: "rgb(238,130,238)",
        sea: "rgb(20,20,100)",
        castle_gate: "rgb(50,50,50)",
        magic: "rgb(139,0,139)",
        funny: "rgb()",
        border: "rgb(0,0,0)",
        start: "rgb(255,255,255)",
        end: "rgb(10,10,10)"
    },
    ROUND: new Set([
        "monster",
        "boss",
        "boss_final"
    ]),
    // Coefs of sounds behind the squares (0 means block sounds (change the square to border)) :
    // throw ni; use the coef ^^ + store the coef in the square code (10.3) of lowered squares.
    SOUND_BLOCKERS: {}
};
ENV.SOUND_BLOCKERS[ENV.CODES.border] = 0;
// ENV.SOUND_BLOCKERS[ENV.CODES.mountains] = 0.5;

export const BQ = {
    // miliseconds beetween each game loop
    FILENAME: "maps/carte_defaut.json",
    TIMEBASE: 200
}

export const AUDIO = {
    VOLUME_ENV: 1,
    VOLUME_ENV_PLAYER: 0.65,
    VOLUME_ENV_PROX: 0.5,
    VOLUME_ACTION: 1,
    VOLUME_HEART: 1,
    AUDIO_START_MUTE: true
};

export const DEBUG = {
    DISABLE: false,
    AUDIO: false,
    AUDIO_STOP: false,
    AUDIO_PLAY: false,
    BQ: false,
    EVENTS: false,
    EVENTS_REGISTER: false,
    FIGHTS: true,
    KB: false,
    TIME: {
        LIMIT: 10,
        LOAD: false,
        LOOP: false,
        BET_LOOPS: false,
        RULE: false,
        GETPROXMAP: false,
    }
};

export const DEV_TOOLS = {
    SHOW_LIFE: true,
    SHOW_PROX_MAP: true,
    SHOW_WHOLE_MAP: false,
    // "txt" or "square" :
    SHOW_MAP_TYPE: "square",
    SHOW_MAP_COLORS: true,
}

export const PLAYER = {
    MAX_LIFE: 20,
    DEFAULT_DAMAGES: 1,
    PROBA_HIT: 0.85
};

// type: life, damages, proba_hit
export const MONSTERS = {};
MONSTERS[ENV.CODES.monster] = { id: ENV.CODES.monster, life: 1, damages: 1, proba_hit: 0.5, proba_death: 0.2 };
MONSTERS[ENV.CODES.boss] = { id: ENV.CODES.boss, life: 2, damages: 2, proba_hit: 0.5, proba_death: 0.2 };
MONSTERS[ENV.CODES.boss_final] = { id: ENV.CODES.boss_final, life: 3, damages: 3, proba_hit: 0.6, proba_death: 0.8 };

export const BAD_SQUARES_CODES = new Set([
    ENV.CODES.bonus, // Prevent loops
    ENV.CODES.mountains,
    ENV.CODES.border,
    ENV.CODES.water,
    ENV.CODES.sea
]);

export const EVENTS = {
    REPORT_DUPLICATES: false,
};

export const RULES = {
    MOVE: false,
};

export default {
    AUDIO,
    BAD_SQUARES_CODES,
    BQ,
    DEBUG,
    DEV_TOOLS,
    ENV,
    EVENTS,
    MONSTERS,
    PLAYER,
    RULES,
};