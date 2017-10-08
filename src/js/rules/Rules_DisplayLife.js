export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.world.player.life_changed dispLife",
        main: undefined,
        events: [
            "bq.world.player.life_changed",
            "bq.game.state.loaded"
        ],
        instant: true
    }

    const tmp = document.getElementById("life");
    if (tmp !== null) {
        document.body.removeChild(tmp);
    }
    const txt = document.createElement("h1");
    txt.style = "position:fixed;top:10px;left:10px;margin:0;";
    txt.id = "life";
    document.body.appendChild(txt);

    rule.main = function (bq, event) {
        event;
        document.getElementById("life").textContent = bq.world.player.life;
    };

    bq.events.register(rule);

    return rule;
}
