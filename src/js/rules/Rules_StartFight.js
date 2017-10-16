export default Base;

const Base = function (bq) {
    const codes = bq.world.env.codes;

    const rule = {
        name: "bq.world.player.moved start_fight",
        main: undefined,
        events: [
            "bq.world.player.moved"
        ],
        instant: true,
        data: new Set([
            codes.monster,
            codes.boss,
            codes.boss_final,
        ])
    }

    rule.main = function (bq, event) {
        event;
        const p = bq.world.player;
        if (rule.data.has(p.square.code)) {

            p.createEnemy(p.square);
            p.state = p.states.fighting;

            bq.interface.disp.console.writeState("fight");

            bq.events.add("bq.world.player.fight_started");
        }
    };

    bq.events.register(rule);

    return rule;
}
