export default loadMove;

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

    // throw ni; think about priority and what is returned (possibility to be thrown away, events,...)
    // >> update mvt_obj ?

    /* --- move.pre --- */
    // args : bq and mvt obj
    // returns : true if move accepted and false if not

    /* nogo */
    // The nogo data can be modified during the game
    // ie : player gaining ability to go through doors...
    move.pre.nogo = {
        method: function (bq, mvt_obj) {
            // throw ni;
            let nogo = bq.world.env.rules.move.nogo;
            if (nogo.data && nogo.data.has(mvt_obj.dest.type)) {
                if (nogo.sounds) {
                    bq.audio.action.play(nogo.sounds);
                }
                return false;
            }
            else
                return true;
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
