export default Player;

const Player = function (startSquare) {
    // throw ni; Use config.js for some parameters
    const player = {
        square: undefined,
        life: 10,
        move: undefined,
        placeOn: undefined,
        kill: undefined,
        state: 0,
        // Again, the numbers don't have any purpose for now.
        states: {
            wandering: 1,
            dead: 2,
            fighting: 3
        }
    };

    player.placeOn = function (square) {
        player.square = square;
        if (square !== undefined) {
            console.log(`PLAYER PLACED AT (${square.x},${square.y}) ON ${square.type}`);
        }
    }

    player.move = function (mvt_obj) {
        player.square = mvt_obj.dest;

        console.log(`PLAYER MOVED TO (${player.square.x},${player.square.y}) ON ${player.square.type}`);
    }

    // Kills the player and stop the game
    // throw ni; use an event/rule ?
    player.kill = function (bq) {
        player.life = 0;
        player.state = player.states.dead;

        bq.events.add("bq.game.stop")

        console.log("PLAYER KILLED");
    }

    player.placeOn(startSquare);
    player.state = player.states.wandering;

    return player;
}