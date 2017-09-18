export default Player;

const Player = function (startSquare) {
    // throw ni; Use config.js for some parameters
    const player = {
        square: startSquare,
        life: 10,
        move: undefined,
        kill: undefined,
        state: 0,
        // Again, the numbers don't have any purpose for now.
        states: {
            wandering: 1,
            dead: 2,
            fighting: 3
        }
    };

    player.move = function (mvt_obj) {
        player.square = mvt_obj.dest;

        console.log(`\tPLAYER MOVED TO (${player.square.x},${player.square.y}) ON ${player.square.type}`);
    }

    // Kills the player and stop the game
    // throw ni; use an event/rule ?
    player.kill = function (bq) {
        player.life = 0;
        player.state = player.states.dead;

        bq.events.add("bq.game.stop")

        console.log("\tPLAYER KILLED");
    }

    console.log(`PLAYER PLACED AT (${startSquare.x},${startSquare.y}) ON ${startSquare.type}`);

    player.state = player.states.wandering;

    return player;
}