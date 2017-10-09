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
        kill: undefined,
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
            console.log(`PLAYER PLACED AT (${square.x},${square.y}) ON ${square.type}`);
        }
    }

    player.move = function (mvt_obj) {
        player.square = mvt_obj.dest;

        console.log(`PLAYER MOVED TO (${player.square.x},${player.square.y}) ON ${player.square.type}`);
    }

    // Kills the player and stop the game
    // throw ni; use an event/rule ?
    player.kill = function () {
        player.life = 0;
    }

    player.die = function (bq) {
        player.state = player.states.dead;
        bq.interface.audio.players.actions.play("mortcombat");

        bq.events.add("bq.game.stop")

        console.log("PLAYER KILLED");
    }

    player.createEnemy = function (square) {
        const en = opts.MONSTERS[square.code];
        let life = en.life;
        if (en !== undefined) {
            player.cur_enemy = {
                get life() { return life; },
                set life(new_life) {
                    life = new_life;
                    if (life <= 0) {
                        player.cur_enemy.die();
                    }
                },
                damages: en.damages,
                proba_hit: en.proba_hit,
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