export default moves;

const moves = function (bq) {
    const moves = {
        // determine wether you can moves or not or what happens when you try to leave, ...
        pre: {},
        // when you try to leave, the square may hurt you, ...
        post: {},
        // static effects when staying on the case
        static: {}
    }

    /* --- moves.pre --- */
    // args : world and mvt obj
    // returns : true if moves accepted and false if not

    // throw ni; think about priority and what is returned (possibility to be thrown away, events,...)

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
}
