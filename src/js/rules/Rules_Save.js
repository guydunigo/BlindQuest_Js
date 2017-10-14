export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.game.save",
        events: [
            "bq.game.save"
        ],
        main: undefined,
        instant: false,
        data: {
        }
    }

    // Generate json file and export it :
    rule.main = function (bq, event) {
        event;
        const player = bq.world.player;
        const save_obj = {
            world: {
                isReady: bq.world.isReady,
                name: bq.world.name,
                steps: bq.world.steps,
                data: bq.world.data,
                player: {
                    pos: [player.square.x, player.square.y],
                    life: player.life,
                    damages: player.damages,
                    state: player.state,
                    cur_enemy: player.cur_enemy,
                }
            }
        };

        const str = JSON.stringify(save_obj);
        const test = new Blob([str], { type: "application/json" });
    };

    bq.events.register(rule);

    return rule;
}