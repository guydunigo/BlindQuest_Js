export default Base;

const getLastElmt = function (event) {
    const tmp = event.split(".");
    return tmp[tmp.length - 1];
}

const Base = function (bq) {
    const rule = {
        name: "bq.game.state",
        main: undefined,
        events: [
            "bq.game.state"
        ],
        instant: true,
        data: {
            "bq.game.state.loading": "Game loading world...",
            "bq.game.state.loaded": "Game loaded.",
            "bq.game.state.launching": "Launching game...",
            "bq.game.state.launched": "Game launched, have fun!",
            "bq.game.state.stopped": "Game stopped (you either died or quit) (press r to restart).",
            "bq.game.state.paused": "Game paused (press p to resume).",
            "bq.game.state.won": "Game finished, you won ! (press r to restart).",
            length_total: 30,
            length_limits: 9
        }
    }

    rule.main = function (bq, event) {
        if (Object.keys(rule.data).includes(event)) {
            bq.interface.disp.writeState(
                rule.data[event],
                getLastElmt(event),
                rule.data.length_total,
                rule.data.length_limits
            );
        }
    };

    bq.events.register(rule);

    return rule;
}