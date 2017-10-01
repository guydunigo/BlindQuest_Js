export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.game.changeState",
        main: undefined,
        events: [
            "bq.game"
        ],
        instant: true,
        data: {
            "bq.game.loaded": bq.states.loaded,
            "bq.game.launched": bq.states.launched,
            "bq.game.paused": bq.states.paused,
            "bq.game.stopped": bq.states.stopped,
        }
    }

    rule.main = function (bq, event) {
        if (Object.keys(rule.data).includes(event)) {
            bq.state = rule.data[event];
        }
        console.log(bq.state);
    };

    bq.events.register(rule);

    return rule;
}