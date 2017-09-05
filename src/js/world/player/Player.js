export default Player;

const Player = function (startSquare) {
    // throw ni; Use config.js for some parameters
    const player = {
        square: startSquare,
        life: 10
    };

    console.log(`PLAYER PLACED AT (${startSquare.x},${startSquare.y}) ON ${startSquare.type}`);

    return player;
}