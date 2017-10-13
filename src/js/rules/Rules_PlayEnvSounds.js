export default PlayEnvSounds;

const getDistance = function (x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

const PlayEnvSounds = function (bq) {
    const rule = {
        name: "bq.world.player.moved playEnvSound",
        main: undefined,
        events: [
            "bq.world.player.moved"
        ],
        instant: true,
        data: {
            radius: 2,
            prox_sounds: new Set([ // throw ni; Expand this list
                bq.world.env.codes.water,
                bq.world.env.codes.sea,
                bq.world.env.codes.bridge
            ]),
            prev_code: 0,
        }
    }

    rule.main = function (bq, event) {
        event;
        const env_player = bq.interface.audio.players.env;
        const pos = bq.world.player.square;
        let rel_pos;
        const submap = bq.world.getProxMap(pos.x, pos.y, rule.data.radius);
        let distance, inv_dist;

        env_player.stopProx();

        submap.forEach(function (line, li) {
            line.forEach(function (elmt, ei) {
                rel_pos = {
                    x: ei - rule.data.radius,
                    y: li - rule.data.radius
                }
                if (rel_pos.x === 0 && rel_pos.y === 0) {
                    if (elmt !== rule.data.prev_code) {
                        env_player.playPlayer(bq.world.env.code2sound(elmt));
                        rule.data.prev_code = elmt;
                    }
                    bq.interface.audio.players.actions.play("walking-in-snow-soundjay_short");
                }
                else if (rule.data.prox_sounds.has(elmt)) {
                    distance = getDistance(
                        0,
                        0,
                        rel_pos.x,
                        rel_pos.y
                    );

                    inv_dist = 1 / (distance);
                    inv_dist = Number.parseFloat(inv_dist.toFixed(6));

                    env_player.playProx(bq.world.env.code2sound(elmt), inv_dist);
                }
            });
        });

        env_player.debug_printAll();
    }

    bq.events.register(rule);

    return rule;
}