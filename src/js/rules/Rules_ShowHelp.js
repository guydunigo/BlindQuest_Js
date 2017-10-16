export default Base;

const Base = function (bq) {
    const popup = bq.interface.disp.popup;
    return bq.events.register({
        name: "bq.game.help",
        events: [
            "bq.game.help"
        ],
        main(bq, event) {
            event;
            if (!popup.isUp) {
                // throw ni; translate
                popup.write("La touche H vous permet d'afficher de nouveau cette aide.\n\
                ↑ pour aller au nord, ↓ pour le sud, ← pour l'ouest, et ⇥ pour l'est\n\
                P met le jeu en pause et reprend la partie.\nF active et désactive le plein écran.\n\
                M permet de couper le son.\n\
                La barre ESPACE permet d'attaquer lors d'un combat.\nR permet de redémarrer le jeu à tout moment.\nS pour sauvegarder et C pour charger un monde ou une sauvegarde.");
            }
            else {
                popup.remove();
            }
        },
        instant: true
    });
}