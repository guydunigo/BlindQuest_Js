export default Base;

import opts from "../config.js";

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
        let damages = 0;
        if (Math.random() < attacker.proba_hit) {
            // hit
            bq.interface.audio.players.actions.play(sound_hit, 1,
                () => bq.interface.audio.players.actions.play(receiver_hurt, 1,
                    () => {
                    }));

            if (opts.DEBUG.FIGHTS) {
                console.log("FIGHT HIT A : " + attacker.life + " R : " + (receiver.life - attacker.damages));
            }

            if (callback) callback();
            receiver.life -= attacker.damages;
        }
        else {
            // missed
            if (opts.DEBUG.FIGHTS) {
                console.log("FIGHT MISSED");
            }

            bq.interface.audio.players.actions.play(sound_missed, 1, callback);
        }
        return damages;
    }

    rule.main = function (bq, event) {
        event;
        const p = bq.world.player;
        // throw ni; random damages
        if (p.state == p.states.fighting) {
            fight(p, p.cur_enemy, "epeehit", "epeemissed", "monstreblesse",
                () => fight(p.cur_enemy, p, "marteauhit_short", "epeemissed", "joueurblesse"/*,
                    () => {
                        if (p.cur_enemy.life <= 0) {
                            bq.events.add("bq.world.player.end_fight");
                        }
                    }*/
                ));
        }
    };

    bq.events.register(rule);

    return rule;
}
