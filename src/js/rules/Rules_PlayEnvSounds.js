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
            prox_sounds: [
                bq.world.env.codes.water,
                bq.world.env.codes.sea,
                bq.world.env.codes.bridge,
            ]
        }
    }

    rule.main = function (bq, event) {
        // throw ni;
        const play = bq.interface.audio.players.env.play;
        const pos = bq.world.player.square;
        const submap = bq.world.getSubMap(pos.x, pos.y, rule.data.radius);
        let distance, inv_dist;

        bq.interface.audio.players.env.stopAll();

        submap.forEach(function (line, li) {
            line.forEach(function (elmt, ei) {
                if (ei - rule.data.radius - 1 === 0 && li - rule.data.radius - 1 === 0) {
                    play(bq.world.env.code2sound(elmt));
                }
                else if (rule.data.prox_sounds.includes(elmt)) {
                    distance = getDistance(
                        pos.x,
                        pos.y,
                        ei - pos.x,
                        li - pos.y
                    );
                    inv_dist = 1 / distance;
                    inv_dist = Number.parseFloat(inv_dist.toFixed(6));
                    play(bq.world.env.code2sound(elmt), inv_dist);
                }
            });
        });
    }

    bq.events.register(rule);

    return rule;
}