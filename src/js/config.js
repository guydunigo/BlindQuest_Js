// To json

// Will contain all environment codes, music filenames, their behaviour, player infos, ...

export const BQ = {
    // miliseconds beetween each game loop
    TIMEBASE: 200
}

export const AUDIO = {
    VOLUME_ENV: 1,
    VOLUME_ENV_PLAYER: 0.75,
    VOLUME_ENV_PROX: 0.5,
    VOLUME_ACTION: 1,
    AUDIO_START_MUTE: true
};

export const DEBUG = {
    AUDIO: true,
    AUDIO_STOP: false,
    AUDIO_PLAY: false,
    KB: false,
    EVENTS: false,
    EVENTS_REGISTER: false
};

export default {
    AUDIO,
    DEBUG,
};