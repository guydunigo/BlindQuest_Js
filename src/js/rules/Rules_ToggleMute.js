export default ToggleMute;

const ToggleMute = function (bq) {
    const rule = {
        name: "bq.interface.mute",
        main: undefined,
        events: [
            "bq.interface.mute"
        ],
        instant: true
    }

    rule.main = function (bq, event) {
        bq.interface.audio.toggleMute();
    };

    bq.events.register(rule);

    return rule;
}
