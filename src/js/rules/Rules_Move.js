export default Move;

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
        // throw ni; use functions to calculate the vector
        //      ie : depending on stamina, ...
        data: {
            "bq.world.player.move.up": [0, -1],
            "bq.world.player.move.down": [0, 1],
            "bq.world.player.move.left": [-1, 0],
            "bq.world.player.move.right": [1, 0]
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
                bq.world.player.move(mvt);

                // post
                Object.values(move.post).forEach(function (func) {
                    func.main(bq, mvt);
                });

                bq.events.add("bq.world.player.moved");
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
            let nogo = move.pre.nogo;
            if (nogo.data && nogo.data.has(mvt_obj.dest.code)) {
                console.log("RULES MOVE NOGO " + mvt_obj.dest.type);
                // throw ni; pick random sound ?
                // throw ni; change sound
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

    // throw ni; Add proba to escape ? + with damages ?
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
                console.log("RULES MOVE LETHAL " + mvt_obj.dest.type);

                bq.interface.audio.players.actions.play(letalSounds[index]);
                bq.world.player.kill(bq);
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

    move.post.fight = {
        main(bq, mvt_obj) {
            if (move.post.fight.data.has(mvt_obj.dest.code)) {
                bq.events.add("bq.world.player.start_fight");
            }
        },
        data: new Set([
            codes.monster,
            codes.boss,
            codes.boss_final,
        ])
    }

    // Don't forget to register your rule to the events defined in move.events
    bq.events.register(move);

    return move;
}
