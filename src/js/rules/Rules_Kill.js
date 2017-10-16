export default Base;

const Base = function (bq) {
    return bq.events.register({
        name: "bq.world.player.kill",
        events: ["bq.world.player.kill"],
        main(bq) {
            bq.world.player.life = 0;
        },
        instant: true
    });
}