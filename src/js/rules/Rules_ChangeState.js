export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.game.state changeState",
        main: undefined,
        events: [
            "bq.game.state"
        ],
        instant: true,
        data: {
            "bq.game.state.loaded": bq.states.loaded,
            "bq.game.state.launched": bq.states.launched,
            "bq.game.state.paused": bq.states.paused,
            "bq.game.state.stopped": bq.states.stopped,
        }
    }

    rule.main = function (bq, event) {
        if (Object.keys(rule.data).includes(event)) {
            bq.state = rule.data[event];
        }
    };

    bq.events.register(rule);

    return rule;
}