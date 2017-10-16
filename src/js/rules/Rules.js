// Trying to make a modular (easily extensible) rules system
export default Rules;

import Move from "./Rules_Move.js";
import ToggleFullscreen from "./Rules_ToggleFullscreen.js";
import ToggleMute from "./Rules_ToggleMute.js";
import ShowProxMap from "./Rules_ShowProxMap.js";
import ShowWholeMap from "./Rules_ShowWholeMap.js";
import PlayEnvSounds from "./Rules_PlayEnvSounds.js";
import ChangeState from "./Rules_ChangeState.js";
import Pause from "./Rules_Pause.js";
import Stop from "./Rules_Stop.js";
import Reset from "./Rules_Reset.js";
import Bonus from "./Rules_Bonus.js";
import StartFight from "./Rules_StartFight.js";
import PlayerAttack from "./Rules_PlayerAttack.js";
import EndFight from "./Rules_EndFight.js";
import HeartBeat from "./Rules_HeartBeat.js";
import DispLife from "./Rules_DisplayLife.js";
import StartMute from "./Rules_StartMute.js";
import Victory from "./Rules_Victory.js";
import ShowHelp from "./Rules_ShowHelp.js";
import Save from "./Rules_Save.js";
import Load from "./Rules_Load.js";

const Rules = function (bq) {
    // throw ni; order them in a tree ?
    const rules = {
        move: Move(bq),
        toggle_fullscreen: ToggleFullscreen(bq),
        toggle_mute: ToggleMute(bq),
        show_prox_map: ShowProxMap(bq),
        show_whole_map: ShowWholeMap(bq),
        play_env_sounds: PlayEnvSounds(bq),
        change_state: ChangeState(bq),
        pause: Pause(bq),
        stop: Stop(bq),
        reset: Reset(bq),
        bonus: Bonus(bq),
        start_fight: StartFight(bq),
        player_attack: PlayerAttack(bq),
        end_fight: EndFight(bq),
        heartbeat: HeartBeat(bq),
        disp_life: DispLife(bq),
        start_mute: StartMute(bq),
        victory: Victory(bq),
        show_help: ShowHelp(bq),
        save: Save(bq),
        load: Load(bq)
    };

    return rules;
}