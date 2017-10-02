export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.world.player.attack",
        main: undefined,
        events: [
            "bq.world.player.attack"
        ],
        instant: false,
        data: {
        }
    }

    const fight = function (attacker, receiver, sound_hit, sound_missed, receiver_hurt, callback) {
        if (Math.random() < attacker.proba_hit) {
            // hit
            bq.interface.audio.players.actions.play(sound_hit, 1,
                () => bq.interface.audio.players.actions.play(receiver_hurt, 1, callback));

            receiver.life -= attacker.damages;

            console.log("FIGHT HIT a : " + attacker.life + " r : " + receiver.life);
        }
        else {
            // missed
            bq.interface.audio.players.actions.play(sound_missed, 1, callback);
            console.log("FIGHT MISSED");
        }
    }

    rule.main = function (bq, event) {
        event;
        const p = bq.world.player;
        // throw ni; random damages
        if (p.state == p.states.fighting) {
            fight(p, p.cur_enemy, "epeehit", "epeemissed", "monstreblesse",
                () => fight(p.cur_enemy, p, "marteauhit", "epeemissed", "joueurblesse"));
        }
    };

    bq.events.register(rule);

    return rule;
}
