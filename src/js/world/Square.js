// Square "class"
export default Square;

function Square(world, x, y) {
    let sq = {
        x,
        y,
        get code() {
            return world.getSquareCode(x, y);
        },
        get type() {
            return world.getSquareType(x, y);
        },
        apply: undefined
    };

    // Returns a copy of sq with x and y modified by vect
    sq.apply = function(vect) {
        // throw ni; Maybe check if possible ?
        return Square(world, sq.x + vect[0], sq.y + vect[1]);
    };

    return sq;
};