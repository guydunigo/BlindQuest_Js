// Trying to make a modular (easily extensible) rules system
export default Rules;

import Move from "./Rules_Move.js";
import ToggleFullscreen from "./Rules_ToggleFullscreen.js";
import ToggleMute from "./Rules_ToggleMute.js";
import ShowProxMap from "./Rules_ShowProxMap.js";
import PlayEnvSounds from "./Rules_PlayEnvSounds.js";

const Rules = function (bq) {
    // throw ni; order them in a tree ?
    const rules = {
        move: Move(bq),
        toggle_fullscreen: ToggleFullscreen(bq),
        toggle_mute: ToggleMute(bq),
        show_map: ShowProxMap(bq),
        play_env_sounds: PlayEnvSounds(bq)
    };

    return rules;
}