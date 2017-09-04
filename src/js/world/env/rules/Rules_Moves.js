export default loadMoves;

const loadMoves = function (bq) {
    const moves = bq.world.rules.moves = {
        // determine wether you can moves or not or what happens when you try to leave, ...
        pre: {},
        // when you try to leave, the square may hurt you, ...
        post: {},
        // static effects when staying on the case
        static: {}
    }

    // throw ni; think about priority and what is returned (possibility to be thrown away, events,...)
    // >> update mvt_obj ?

    /* --- moves.pre --- */
    // args : bq and mvt obj
    // returns : true if moves accepted and false if not

    /* nogo */
    moves.pre.nogo = {
        method: function (bq, mvt_obj) {
            // throw ni;
            let nogo = bq.world.env.rules.moves.nogo;
            if (nogo.data && nogo.data.has(mvt_obj.dest.type)) {
                if (nogo.sounds) {
                    bq.audio.play(nogo.sounds);
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

    /* --- moves.post --- */
    // args : new bq obj and mvt obj
    // returns : throw ni;

    /* playSquareSounds */
    moves.post.playSquareSound = {
        method: function (bq, mvt_obj) {
            // throw ni;
            bq.audio.cur_square.play(mvt_obj.dest.type);
        }
    }

    /* playProxSounds */
    moves.post.playProxSounds = {
        method: function (bq, mvt_obj) {
            // throw ni;
            bq.audio.prox.stop();
            bq.audio.prox.play(mvt_obj.dest.prox_squares);
        }
    }

    return moves;
}
