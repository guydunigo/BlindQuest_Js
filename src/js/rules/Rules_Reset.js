export default Base;

const Base = function (bq) {
    return bq.events.register({
        name: "bq.game.reset",
        main(bq) {
            bq.reset(bq);
        },
        events: [
            "bq.game.reset"
        ],
        instant: true
    });
}
