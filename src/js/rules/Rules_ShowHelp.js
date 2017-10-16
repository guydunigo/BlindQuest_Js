export default Base;

const Base = function (bq) {
    const popup = bq.interface.disp.popup;
    return bq.events.register({
        name: "bq.game.help",
        events: [
            "bq.game.help"
        ],
        main(bq, event) {
            event;
            if (!popup.isUp) {
                popup.write(" H : Display and hide this message.\n\
                ↑ : go north, ↓ : south, ← : west, et ⇥ : east\n\
                P : Pause/resume the game.\n\
                F : Enable/disable fullscreen mode.\n\
                M : mute.\n\
                SPACE BAR : Attack during fights.\n\
                R : Reset the game anytime.\nS : Save\n\
                C : Load a world or a savefile.");
            }
            else {
                popup.remove();
            }
        },
        instant: true
    });
}