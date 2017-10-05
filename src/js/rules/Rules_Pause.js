export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.game.pause",
        main(bq, event) {
            event;
            if (bq.state === bq.states.launched) {
                bq.events.add("bq.game.state.paused");
            }
            else if (bq.state === bq.states.paused) {
                bq.events.add("bq.game.state.launched");
            }
        },
        events: [
            "bq.game.pause"
        ],
        instant: true,
    }

    bq.events.register(rule);

    return rule;
}