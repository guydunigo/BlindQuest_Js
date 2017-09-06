// Movement class
export default Mvt;

const Mvt = function (world, origSquare, vect = [0,0]) {
    let mvt;
    mvt = {
        src: origSquare,
        vect: vect,
        get dest() {
            return mvt.src.apply(mvt.vect);
        },
        add(...vects) {
            for (const vec of vects) {
                mvt.vect[0] += vec[0];
                mvt.vect[1] += vec[1];
            }
            return mvt;
        },
        doesNothing() {
            return (mvt.vect[0] === 0 && mvt.vect[1] === 0);
        }
    };

    return mvt;
}