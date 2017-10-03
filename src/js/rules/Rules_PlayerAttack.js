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
        if (attacker.life > 0) {
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
    }

    rule.main = function (bq, event) {
        event;
        const p = bq.world.player;
        // throw ni; random damages
        if (p.state == p.states.fighting) {
            fight(p, p.cur_enemy, "epeehit", "epeemissed", "monstreblesse",
                () => {
                    if (p.cur_enemy.life > 0)
                        fight(p.cur_enemy, p, "marteauhit", "epeemissed", "joueurblesse");
                }
            );

            if (p.cur_enemy.life <= 0) {
                bq.events.add("bq.world.player.end_fight");
            }
        }
    };

    bq.events.register(rule);

    return rule;
}
