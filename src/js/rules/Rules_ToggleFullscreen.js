export default ToggleFullscreen;

const ToggleFullscreen = function (bq) {
    const fs = {
        name: "bq.interface.fullscreen",
        events: [
            "bq.interface.fullscreen"
        ],
        instant: true,
        main: function () {
            // full-screen available?
            if (
                document.fullscreenEnabled ||
                document.webkitFullscreenEnabled ||
                document.mozFullScreenEnabled ||
                document.msFullscreenEnabled
            ) {
                if (document.fullscreen == false) {
                    if (document.body.requestFullscreen) {
                        document.body.requestFullscreen();
                    } else if (document.body.webkitRequestFullscreen) {
                        document.body.webkitRequestFullscreen();
                    } else if (document.body.mozRequestFullScreen) {
                        document.body.mozRequestFullScreen();
                    } else if (document.body.msRequestFullscreen) {
                        document.body.msRequestFullscreen();
                    }
                }
                else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            }
        }
    };

    bq.events.register(fs);

    return fs;
};