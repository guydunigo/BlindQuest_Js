export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.game.load",
        events: [
            "bq.game.load"
        ],
        main: undefined,
        instant: false
    }

    const popup = bq.interface.disp.popup;

    rule.main = function (bq, event) {
        event;
        if (popup.isUp) {
            popup.remove();
        }
        else {
            var input = document.createElement("input");
            input.type = "file";
            input.onchange = function () {
                bq.src = input.files[0];
                bq.events.add("bq.game.reset");
                popup.remove();
            };
            popup.write("Click here to load a savefile or a world :", input);
        }
    };

    bq.events.register(rule);

    return rule;
}