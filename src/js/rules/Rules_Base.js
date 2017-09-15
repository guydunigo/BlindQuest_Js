export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.",
        main: undefined,
        events: [
            "bq."
        ],
        instant: false,
        data: {
        }
    }

    rule.main = function (bq, event) {
    };

    bq.events.register(rule);

    return rule;
}
