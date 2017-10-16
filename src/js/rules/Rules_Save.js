export default Base;

// Function to download data to a file
const download = function (data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

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
                name: bq.world.name,
                // isReady: bq.world.isReady,
                // steps: bq.world.steps,
                data: bq.world.data,
                player: {
                    pos: [player.square.x, player.square.y],
                    life: player.life,
                    damages: player.damages,
                    // state: player.state,
                    // cur_enemy: player.cur_enemy,
                    // rules: infos related to rules
                    // other settings ? (kb conf, ...)
                }
            }
        };

        const txt = JSON.stringify(save_obj);
        download(txt, "save_" + save_obj.world.name + "_" + Date.now() + ".json", "application/json");
    };

    bq.events.register(rule);

    return rule;
}