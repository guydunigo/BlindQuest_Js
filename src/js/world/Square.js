// Square "class"
export default Square;

function Square(world, x, y) {
    let sq;
    sq = {
        x: world.correctX(x),
        y: world.correctY(y),
        get code() {
            return world.getSquareCode(sq.x, sq.y);
        },
        get type() {
            return world.getSquareType(sq.x, sq.y);
        },
        get sound() {
            return world.env.sounds.squares[sq.type];
        },
        get prox_squares() {
            return [
                Square(world, x, y - 1),
                Square(world, x, y + 1),
                Square(world, x - 1, y),
                Square(world, x + 1, y)
            ];
        },
        apply: undefined
    };

    // Returns a copy of sq with x and y modified by vect
    sq.apply = function (vect) {
        // throw ni; Maybe check if possible ?
        return Square(world, sq.x + vect[0], sq.y + vect[1]);
    };

    return sq;
};