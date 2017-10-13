export default Base;

const Base = function (bq) {
    const rule = {
        name: "bq.world.player.end_fight victory",
        main: undefined,
        events: [
            "bq.world.player.end_fight"
        ],
        instant: false
    }

    // Wins when the final boss is dead :
    // thow ni; works because the end_fight rule (and playproxsounds) is instant 
    rule.main = function (bq, event) {
        event;
        const p = bq.world.player;

        if (p.cur_enemy.life <= 0 && p.cur_enemy.id === bq.world.env.codes.boss_final) {
            bq.events.add("bq.game.state.won");
            bq.interface.audio.players.env.stopAll();
            bq.interface.audio.players.env.playPlayer("victoire");
        }
    };

    bq.events.register(rule);

    return rule;
}
