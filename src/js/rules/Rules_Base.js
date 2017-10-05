export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.",
        events: [
            "bq."
        ],
        main: undefined,
        instant: false,
        data: {
        }
    }

    rule.main = function (bq, event) {
    };

    bq.events.register(rule);

    return rule;
}

const Base = function (bq) {
    return bq.events.register({
        name: "bq.",
        events: [
            "bq."
        ],
        main(bq, event) {
        },
        instant: false,
        data: {
        }
    });
}