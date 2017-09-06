export default Player;

const Player = function (startSquare) {
    // throw ni; Use config.js for some parameters
    const player = {
        square: startSquare,
        life: 10,
        move: undefined
    };

    // Check if 
    player.moveTo = function (mvt_obj) {
        player.square = mvt_obj.dest;

        console.log(`PLAYER MOVED TO (${player.square.x},${player.square.y}) ON ${player.square.type}`);
    }

    console.log(`PLAYER PLACED AT (${startSquare.x},${startSquare.y}) ON ${startSquare.type}`);

    return player;
}