export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.world.player.start_fight",
        main: undefined,
        events: [
            "bq.world.player.start_fight"
        ],
        instant: true,
        data: {
        }
    }

    rule.main = function (bq, event) {
        event;
        const p = bq.world.player;

        p.createEnemy(p.square);
        p.state = p.states.fighting;

        bq.interface.disp.console.writeState("fight");
    };

    bq.events.register(rule);

    return rule;
}
