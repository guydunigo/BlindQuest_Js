// Trying to make a modular (easily extensible) rules system
export default Rules;

import Move from "./Rules_Move.js";
import ToggleFullscreen from "./Rules_ToggleFullscreen.js";
import ToggleMute from "./Rules_ToggleMute.js";
import ShowProxMap from "./Rules_ShowProxMap.js";
import PlayEnvSounds from "./Rules_PlayEnvSounds.js";
import ChangeState from "./Rules_ChangeState.js";
import Pause from "./Rules_Pause.js";
import Stop from "./Rules_Stop.js";
import Bonus from "./Rules_Bonus.js";
import StartFight from "./Rules_StartFight.js";
import PlayerAttack from "./Rules_PlayerAttack.js";
import EndFight from "./Rules_EndFight.js";

const Rules = function (bq) {
    // throw ni; order them in a tree ?
    const rules = {
        move: Move(bq),
        toggle_fullscreen: ToggleFullscreen(bq),
        toggle_mute: ToggleMute(bq),
        show_map: ShowProxMap(bq),
        play_env_sounds: PlayEnvSounds(bq),
        change_state: ChangeState(bq),
        pause: Pause(bq),
        stop: Stop(bq),
        bonus: Bonus(bq),
        start_fight: StartFight(bq),
        player_attack: PlayerAttack(bq),
        end_fight: EndFight(bq),
    };

    return rules;
}