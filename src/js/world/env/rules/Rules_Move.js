export default loadMove;

import Mvt from "./Movement.js";

const loadMove = function (bq) {
    const move = bq.world.env.rules.move = {
        // debug purpose only
        name: "move",
        // Actual moving method :
        main: undefined,
        // Triggered by event(s) : must be an Array
        events: [
            "world.player.move"
        ],
        // Any data for the rule
        //   here, you have the mvt vectors applyed :
        data: {
            "world.player.move.up": [0, -1],
            "world.player.move.down": [0, 1],
            "world.player.move.left": [-1, 0],
            "world.player.move.right": [1, 0]
        },

        // throw ni; use these in the main or in Events.js ?

        // played before the main
        // determine wether you can move or not or what happens when you try to leave, ...
        pre: {},
        // played after the main is executed
        // ie : when you try to leave, the square may hurt you, ...
        post: {},
        // applied when there is no events for this rule
        // ie : static effects when staying on the case
        idle: {}
    }

    move.main = function (bq, events) {
        let nomove = true;
        if (events.length > 0) {
            // Calculating Mvt obj
            const dirs = [];
            let mvt;

            events.forEach(function (x) {
                if (move.data[x] !== undefined) {
                    dirs.push(x);
                }
            });

            // throw ni; more than one deplacements
            // mvt = Mvt(bq.world, bq.world.player.square);
            // mvt.add(...dirs);

            dirs.forEach(function (dir) {
                mvt = Mvt(bq.world, bq.world.player.square, dir);

                // pre
                Object.values(move.pre).forEach(function (func) {
                    mvt = pre.main(bq, mvt);
                });
                //throw ni; find a way to calculate new mvt with priority (use an array ?)

                // actual move
                if (!mvt.doesNothing()) {
                    bq.world.player.square = Mvt.dest;
                    nomove = false;
                }

                // post
            });
        }
        // Apply static effect when staying on the square
        if (nomove) {
            Object.values(move.idle).forEach(function (func) {
                func.main(bq);
            });
        }
    };

    // throw ni; think about priority and what is returned (possibility to be thrown away, events,...)
    // >> update mvt_obj ?

    /* --- move.pre --- */
    // args : bq and mvt obj
    // returns : true if move accepted and false if not

    /* nogo */
    // The nogo data can be modified during the game
    // ie : player gaining ability to go through doors...
    move.pre.nogo = {
        main: function (bq, mvt_obj) {
            // throw ni; for bigger moves, check path...
            let nogo = bq.world.env.rules.move.nogo;
            if (nogo.data && nogo.data.has(mvt_obj.dest.type)) {
                bq.audio.action.play(nogo.sounds);
                return Mvt(bq.world, mvt_obj.src, [0, 0]);
            }
            else
                return mvt;
        },
        data: new Set([
            bq.world.env.codes.mountains,
            bq.world.env.codes.border
        ]),
        sounds: ["bump_wall"],
    }

    /* --- move.post --- */
    // args : new bq obj and mvt obj
    // returns : throw ni;

    /* playSquareSounds */
    move.post.playSquareSound = {
        method: function (bq, mvt_obj) {
            // throw ni;
            bq.audio.cur_square.play(mvt_obj.dest.type);
        }
    }

    /* playProxSounds */
    move.post.playProxSounds = {
        method: function (bq, mvt_obj) {
            // throw ni;
            bq.audio.prox.stop();
            bq.audio.prox.play(mvt_obj.dest.prox_squares);
        }
    }

    // Don't forget to register your rule to the events defined in move.events
    bq.events.register(move);

    return move;
}
