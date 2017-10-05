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
    }
};

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
    BQ: true,
    BQ_PLAY_LOOP: false,
    AUDIO: true,
    AUDIO_STOP: false,
    AUDIO_PLAY: false,
    KB: false,
    EVENTS: false,
    EVENTS_REGISTER: false
};

export const PLAYER = {
    MAX_LIFE: 20,
    DEFAULT_DAMAGES: 1,
    PROBA_HIT: 0.85
};

// type: life, damages, proba_hit
export const MONSTERS = {};
MONSTERS[ENV.CODES.monster] = { life: 1, damages: 1, proba_hit: 0.5 };
MONSTERS[ENV.CODES.boss] = { life: 2, damages: 2, proba_hit: 0.5 };
MONSTERS[ENV.CODES.boss_final] = { life: 3, damages: 3, proba_hit: 0.6 };

export const BAD_SQUARES_CODES = new Set([
    ENV.CODES.bonus, // Prevent loops
    ENV.CODES.mountains,
    ENV.CODES.border,
    ENV.CODES.water,
    ENV.CODES.sea
]);

export default {
    AUDIO,
    BAD_SQUARES_CODES,
    BQ,
    DEBUG,
    ENV,
    MONSTERS,
    PLAYER,
};