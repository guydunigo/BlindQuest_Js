export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.world.player.bonus",
        main: undefined,
        events: [
            "bq.world.player.bonus"
        ],
        instant: false,
        data: {
            effect: 5
        }
    }

    // throw ni; different effects + Lara's "haaaa" sound ;)
    rule.main = function (bq, event) {
        event;
        bq.world.player.life += rule.data.effect;
        // Play the sound
        bq.interface.audio.players.actions.play("bonus");
    };

    bq.events.register(rule);

    return rule;
}
