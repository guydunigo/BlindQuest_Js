export default Player;

const Player = function (startSquare) {
    // throw ni; Use config.js for some parameters
    const player = {
        loc: startSquare,
        life: 10
    };

    console.log(`PLAYER MOVED (${startSquare.x},${startSquare.y}) ${startSquare.type}`);

    return player;
}