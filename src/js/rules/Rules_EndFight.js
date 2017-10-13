export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.world.player.end_fight",
        main: undefined,
        events: [
            "bq.world.player.end_fight"
        ],
        instant: true,
        data: {
        }
    }

    rule.main = function (bq, event) {
        event;
        const p = bq.world.player;

        if (p.cur_enemy.life <= 0) {
            p.state = p.states.wandering;

            p.square.code = bq.world.getNewCode(p.square);

            bq.interface.disp.console.writeState("fight end");

            bq.events.add("bq.world.player.moved");
        }
    };

    bq.events.register(rule);

    return rule;
}
