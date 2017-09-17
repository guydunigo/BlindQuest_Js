// Square "class"
export default Square;

function Square(world, x, y) {
    let sq;
    let _x, _y;
    sq = {
        get x() { return _x; },
        set x(val) { return (_x = world.correctX(val)); },
        get y() { return _y; },
        set y(val) { return (_y = world.correctY(y)); },
        get code() {
            return world.getSquareCode(sq.x, sq.y);
        },
        get type() {
            return world.getSquareType(sq.x, sq.y);
        },
        get sound() {
            return world.env.sounds.squares[sq.type];
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