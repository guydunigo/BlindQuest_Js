export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.game.pause",
        main: undefined,
        events: [
            "bq.game.pause"
        ],
        instant: true,
    }

    rule.main = function (bq, event) {
        if (bq.state === bq.states.launched) {
            bq.events.add("bq.game.paused");
        }
        else if (bq.state === bq.states.paused) {
            bq.events.add("bq.game.launched");
        }
    };

    bq.events.register(rule);

    return rule;
}