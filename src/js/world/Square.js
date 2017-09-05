// Square "class"
export default Square;

const Square = function (world, x, y) {
    return {
        x,
        y,
        get code() {
            return world.getSquareCode(x, y);
        },
        get type() {
            return world.getSquareType(x, y);
        }
    };
};