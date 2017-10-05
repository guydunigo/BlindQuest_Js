// event life_changed
export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.world.player.life_changed heartbeat",
        main: undefined,
        events: [
            "bq.world.player.life_changed"
        ],
        instant: true,
        data: {
            start_under: 10,
        }
    }

    const heart_p = bq.interface.audio.players.heart;

    rule.main = function (bq, event) {
        event;
        const p = bq.world.player;
        if (p.life <= 0 || p.life > rule.data.start_under) {
            heart_p.pause();
        }
        else if (p.life <= rule.data.start_under) {
            heart_p.play((rule.data.start_under - p.life) / rule.data.start_under);
        }
    };

    bq.events.register(rule);

    return rule;
}
