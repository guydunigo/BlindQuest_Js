// event life_changed
export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.world.player.life_changed heartbeat",
        main: undefined,
        events: [
            "bq.world.player.life_changed"
        ],
        data: {
            start_under: 5,
        }
    }

    rule.main = function (bq, event) {
        event;
        const p = bq.world.player;
        if (p.life <= rule.data.start_under) {
            bq.interface.audio.players.heart.play(1 / p.life);
        }
    };

    bq.events.register(rule);

    return rule;
}
