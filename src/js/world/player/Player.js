export default Player;

import opts from "../../config.js";

const Player = function (bq, startSquare) {
    let life = opts.PLAYER.MAX_LIFE;
    let player;
    player = {
        square: undefined,
        get life() { return life },
        set life(nlife) {
            life = nlife > opts.PLAYER.MAX_LIFE ? opts.PLAYER.MAX_LIFE : nlife;
            if (life <= 0) {
                player.die(bq);
            }
            bq.events.add("bq.world.player.life_changed");
            return life;
        },
        damages: opts.PLAYER.DEFAULT_DAMAGES,
        proba_hit: opts.PLAYER.PROBA_HIT,
        move: undefined,
        placeOn: undefined,
        die: undefined,
        createEnemy: undefined,
        state: 0,
        // Again, the numbers don't have any purpose for now.
        states: {
            wandering: 1,
            dead: 2,
            fighting: 3
        },
        cur_enemy: undefined
    };

    player.placeOn = function (square) {
        player.square = square;
        if (square !== undefined) {
            bq.interface.disp.console.write(`PLAYER PLACED AT (${square.x},${square.y}) ON ${square.type}`);
        }
    }

    player.move = function (mvt_obj) {
        player.square = mvt_obj.dest;

        if (opts.RULES.MOVE) {
            bq.interface.disp.console.write(`PLAYER MOVED TO (${player.square.x},${player.square.y}) ON ${player.square.type}`);
        }
    }

    player.die = function (bq) {
        player.state = player.states.dead;
        bq.interface.audio.players.actions.play("mortcombat");

        bq.events.add("bq.game.stop")

        bq.interface.disp.console.write("PLAYER KILLED");
    }

    player.createEnemy = function (square) {
        const en = opts.MONSTERS[square.code];
        let life = en.life;
        if (en !== undefined) {
            player.cur_enemy = {
                id: en.id,
                get life() { return life; },
                set life(new_life) {
                    life = new_life;
                    if (life <= 0) {
                        player.cur_enemy.die();
                    }
                },
                damages: en.damages,
                get proba_hit() {
                    return (player.cur_enemy.life > 0) ? en.proba_hit : en.proba_death;
                },
                die: function () {
                    bq.events.add("bq.world.player.end_fight");
                }
            };
        }
    }

    player.placeOn(startSquare);
    player.state = player.states.wandering;

    return player;
}