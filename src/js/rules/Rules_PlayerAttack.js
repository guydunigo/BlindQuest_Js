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
        if (Math.random() < attacker.proba_hit) {
            // hit
            bq.interface.audio.players.actions.play(sound_hit, 1,
                () => bq.interface.audio.players.actions.play(receiver_hurt, 1,
                    () => {
                    }));

            if (opts.DEBUG.FIGHTS) {
                bq.interface.disp.console.write("FIGHT HIT A : " + attacker.life + " R : " + (receiver.life - attacker.damages) + " PROBA : " + attacker.proba_hit);
            }

            receiver.life -= attacker.damages;
        }
        else {
            // missed
            if (opts.DEBUG.FIGHTS) {
                bq.interface.disp.console.write("FIGHT MISSED");
            }

            bq.interface.audio.players.actions.play(sound_missed, 1);
        }

        if (callback) callback();
    }

    rule.main = function (bq, event) {
        event;
        const p = bq.world.player;
        if (p.state == p.states.fighting) {
            fight(p, p.cur_enemy, "epeehit", "epeemissed", "monstreblesse",
                () => fight(p.cur_enemy, p, "marteauhit", "epeemissed", "joueurblesse"));
        }
    };

    bq.events.register(rule);

    return rule;
}
