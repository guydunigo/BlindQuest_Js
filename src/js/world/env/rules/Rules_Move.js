export default loadMove;

import Mvt from "./Movement.js";

const loadMove = function (bq) {
    const move = bq.world.env.rules.move = {
        // debug purpose only
        name: "world.player.move",
        // Actual moving method :
        main: undefined,
        // Triggered by event(s) : must be an Array
        events: [
            "world.player.move"
        ],
        // Any data for the rule
        //   here, you have the mvt vectors applyed :
        // throw ni; use functions to calculate the vector
        //      ie : depending on stamina, ...
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

    move.main = function (bq, event) {
        // Calculating Mvt obj
        const dir = move.data[event];

        if (dir !== undefined) {
            let mvt = Mvt(bq.world, bq.world.player.square, dir);

            // pre
            Object.values(move.pre).forEach(function (func) {
                mvt = func.main(bq, mvt);
            });
            //throw ni; find a way to calculate new mvt with priority (use an array ?)


            // actual move
            if (!mvt.doesNothing()) {
                bq.world.player.moveTo(mvt);

                // post
                Object.values(move.post).forEach(function (func) {
                    func.main(bq, mvt);
                });
            }
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
            let nogo = bq.world.env.rules.move.pre.nogo;
            if (nogo.data && nogo.data.has(mvt_obj.dest.code)) {
                console.log("RULES MOVE NOGO " + mvt_obj.dest.type);
                // throw ni; pick random sound ?
                bq.interface.audio.action.play(nogo.sounds[0]);
                return Mvt(bq.world, mvt_obj.src, [0, 0]);
            }
            else
                return mvt_obj;
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
        main: function (bq, mvt_obj) {
            // throw ni;
            bq.interface.audio.cur_square.play(mvt_obj.dest);
        }
    }

    /* playProxSounds */
    move.post.playProxSounds = {
        main: function (bq, mvt_obj) {
            // throw ni;
            bq.interface.audio.prox.stop();
            bq.interface.audio.prox.play(mvt_obj.dest.prox_squares);
        }
    }

    /* lethal squares */
    move.post.letalSquares = {
        main: function (bq, mvt_obj) {
            const letalTypes = move.post.letalSquares.data.map((x) => x[0]);
            if (letalTypes.includes(mvt_obj.dest.code)) {
                console.log("RULES MOVE LETHAL " + mvt_obj.dest.type);
                bq.world.player.kill(bq);
            }
        },
        data: [
            [bq.world.env.codes.water, "drown"]
        ]
    }

    // Don't forget to register your rule to the events defined in move.events
    bq.events.register(move);

    return move;
}
