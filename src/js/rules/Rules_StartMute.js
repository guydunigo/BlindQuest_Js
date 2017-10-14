export default Base;

import opts from "../config.js";

const Base = function (bq) {
    let rule = undefined;

    if (opts.AUDIO.START_MUTE === true) {
        rule = {
            name: "bq.game.state.loaded startMute",
            events: [
                "bq.game.state.loaded"
            ],
            main(bq) {
                bq.interface.audio.isMute = true;
            },
            instant: true
        };
        bq.events.register(rule);
    }

    return rule;
}