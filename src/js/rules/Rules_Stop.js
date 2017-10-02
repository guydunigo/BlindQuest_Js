export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.game.stop",
        main(bq, event) {
            event;
            bq.events.add("bq.game.stopped");
        },
        events: [
            "bq.game.stop"
        ],
        instant: true,
    }

    bq.events.register(rule);

    return rule;
}