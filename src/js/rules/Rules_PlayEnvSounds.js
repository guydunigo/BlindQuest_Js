export default PlayEnvSounds;

const PlayEnvSounds = function (bq) {
    const rule = {
        name: "bq.world.player.moved playEnvSound",
        main: undefined,
        events: [
            "bq.world.player.moved"
        ],
        instant: true,
        data: {
            radius: 2
        }
    }

    rule.main = function (bq, event) {
        // throw ni;
        const pos = bq.world.player.square;
        const submap = bq.world.getSubMap(pos.x, pos.y, rule.data.radius);

        const play = bq.interface.audio.players.env.play;
        submap.forEach(function (line) {
            line.forEach(function (elmt) {
                play(bq.world.env.code2sound(elmt));
            });
        });
    }

    bq.events.register(rule);

    return rule;
}