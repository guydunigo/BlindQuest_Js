export default Base;

const getLastElmt = function (event) {
    const tmp = event.split(".");
    return tmp[tmp.length - 1];
}
const formatDebug = function (event, length_total, length_limits) {
    const l = getLastElmt(event);
    const spaces = (length_total - l.length - length_limits * 2) / 2;
    let lims = "";
    for (let i = 0; i <= length_limits; i++) {
        lims += "#";
    }
    let spaces_r = "";
    for (let i = 0; i <= spaces - 1; i++) {
        spaces_r += " ";
    }
    let spaces_l = spaces_r + ((spaces % 1 !== 0) ? " " : "");

    return lims + spaces_l + l + spaces_r + lims;
}

const Base = function (bq) {
    const rule = {
        name: "bq.",
        main: undefined,
        events: [
            "bq.game"
        ],
        instant: true,
        data: {
            "bq.game.loading": "Game loading world...",
            "bq.game.loaded": "Game loaded.",
            "bq.game.launching": "Launching game...",
            "bq.game.launched": "Game launched, have fun!",
            "bq.game.stopped": "Game stopped (you either died or quit).",
            "bq.game.paused": "Game paused (press p to resume).",
            length_total: 30,
            length_limits: 9
        }
    }

    rule.main = function (bq, event) {
        if (Object.keys(rule.data).includes(event)) {
            bq.interface.disp.write(
                rule.data[event],
                formatDebug(event,
                    rule.data.length_total,
                    rule.data.length_limits)
            );
        }
    };

    bq.events.register(rule);

    return rule;
}