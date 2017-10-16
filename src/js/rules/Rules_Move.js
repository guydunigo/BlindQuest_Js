export default Move;

import opts from "../config.js";
import Mvt from "./Movement.js";

const Move = function (bq) {
    const codes = bq.world.env.codes;

    const move = {
        // debug purpose only
        name: "bq.world.player.move",
        // Actual moving method :
        main: undefined,
        // Triggered by event(s) : must be an Array
        events: [
            "bq.world.player.move"
        ],
        // If is instant, execute it directly when the event is called
        //   (doesn't wait for the main loop to handle it)
        instant: false,
        // Any data for the rule
        //   here, you have the mvt vectors applyed :
        //      ie : depending on stamina, ...
        data: {
            "bq.world.player.move.up": [0, -1],
            "bq.world.player.move.down": [0, 1],
            "bq.world.player.move.left": [-1, 0],
            "bq.world.player.move.right": [1, 0]
        },

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

            // actual move
            if (!mvt.doesNothing()) {
                bq.world.player.move(mvt);

                // post
                Object.values(move.post).forEach(function (func) {
                    func.main(bq, mvt);
                });

                bq.events.add("bq.world.player.moved");
            }
        }
    };

    /* --- move.pre --- */
    // args : bq and mvt obj
    // returns : true if move accepted and false if not

    /* nogo */
    // The nogo data can be modified during the game
    // ie : player gaining ability to go through doors...
    move.pre.nogo = {
        main: function (bq, mvt_obj) {
            let nogo = move.pre.nogo;
            if (nogo.data && nogo.data.has(mvt_obj.dest.code)) {
                if (opts.RULES.MOVE) {
                    bq.interface.disp.console.write("RULES MOVE NOGO " + mvt_obj.dest.type);
                }
                bq.interface.audio.players.actions.play("marteauhit");
                return Mvt(bq.world, mvt_obj.src);
            }
            else
                return mvt_obj;
        },
        data: new Set([
            codes.mountains,
            codes.border
        ]),
        sounds: ["bump_wall"],
    }

    move.pre.static_fights = {
        main: function (bq, mvt_obj) {
            const p = bq.world.player;
            let res = mvt_obj;
            if (p.state === p.states.fighting) {
                res = Mvt(bq.world, mvt_obj.src);
            }
            return res;
        }
    }

    /* --- move.post --- */
    // args : new bq obj and mvt obj
    // returns : throw ni;

    /* lethal squares */
    move.post.letalSquares = {
        main: function (bq, mvt_obj) {
            const letalTypes = move.post.letalSquares.data.map((x) => x[0]);
            if (letalTypes.includes(mvt_obj.dest.code)) {
                const index = letalTypes.indexOf(mvt_obj.dest.code);
                const letalSounds = move.post.letalSquares.data.map((x) => x[1]);

                if (opts.RULES.MOVE) {
                    bq.interface.disp.console.write("RULES MOVE LETHAL " + mvt_obj.dest.type);
                }

                bq.interface.audio.players.actions.play(letalSounds[index]);
                bq.events.add("bq.world.player.kill");
            }
        },
        data: [
            [codes.water, "noyade"],
            [codes.sea, "noyade"],
        ]
    }

    move.post.bonus = {
        main(bq, mvt_obj) {
            if (mvt_obj.dest.code === codes.bonus) {
                bq.events.add("bq.world.player.bonus");
                // Change case code :
                mvt_obj.dest.code = bq.world.getNewCode(mvt_obj.dest);
            }
        }
    }

    // Don't forget to register your rule to the events defined in move.events
    bq.events.register(move);

    return move;
}
