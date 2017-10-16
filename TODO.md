Misc
====
* ~~FIRST~~ Later : **Order TODO !**
* Optimize website and display for screen readers
* ~~conf for debug messages~~
* Webapps
* Env files to js script ? security ? sandbox ?
* File for *tool* functions (getDistance, ...);

Features to add
===============
* Debug
    * Debug messages order, format, ...
* Game
    * ~~Shorten time between loops depending on loop length~~
    * Pause when changing tabs
* Files
    * Maps
        * ~~**maps to JSON directly**~~
        * Open file (map) with nodeJs
        * ~~download file (map) in js~~
        * ~~import local~~
            * cf "Save/Load > local" below.
    * ~~Save/Load~~
        * ~~local~~
            * ~~load~~
                * ~~dialog~~
                * drag and drop ?
            * import env (codes, sounds, ...) ?
        * Online ?
    * Config
        * Square types, sounds, voices...
* Interface
    * Bq visual theme
    * Input
        * Voice commanded ? (chat with player...)
        * Change automatically commands in help message
        * Visual buttons
    * Easily translatable
    * Non disturbing visual interface
        * keep Bq visual theme *but*
            don't hurt eyes displaying smtg (you must be able to play with closed eyes)
    * Help
        * Ingame :
            * Voice ?
            * displayable
        * Adapted to input mean
        * Wiki (github)
    * Simple onomatopoeia appearing on the blank page
    * ~~Fullscreen~~
    * ~~Mute button~~
        * Visual
    * ~~Pause (and mute ?)~~
        * Pause on load, save, ... ?
    * Character describing what's happening ?
        ex : "Damn it ! The effects of *potion* are nearly off."
        * Or sidekick
* Environment
    * Player to more generic class *character* for monsters
    * ~~Load map~~
    * Optimize getproxmap (stop writing if the map is already *black*)
    * Map editor
        * Display map with color
        * Export json file
    * Day/Night ? (+ sounds)
    * Weather (wind, rain, storm, ... + different strength)
        * Covering the other sounds
        * Acting on the player : harder to walk/random moves, weariness, damages...
    * Slow death squares : Quicksand (sable mouvant)/...
    * Probability to be saved from water (return to coast by waves? NPCs ?)
    * Places
        * Dungeons
            * Open/Unlock/Close doors
                * Key
                * Pick ?
                * Break ?
                * Jam ? (prevent enemies from coming in)
            * Timed events *tic tac*
            * Buttons / Levers / ...
            * Pressplates : *click* or *crrrr* when stepping on it
        * Towns
            * NPCs
                * Voices
                * Interactions (selection mode ?)
                    * Exange/Sell/Buy
                        * Money ?
            * Inns
                * Sleep
                    * Mana ? Stamina ? bonus ?
* Move around
    * Touch (mobile) support
    * ability to go through walls, doors, ... (temporarily remove elmnts from nogo.data)
    * 3d ? (df style)
        * command to get position (=> number of *bip*s)
    * Change orientation
        * *Ding* when facing North (or West)
    * Only one move per gameloop ? Prevent moving left and right at the same time)
    * Map
        * Draw it on the screen as the player discovers new squares ? (would break the audio-exclusive rule :/)
            * Or snake-like line showing only the n last cases used
                * Can be done with a voice telling *left left right ...*
        * ~~Letal squares~~
        * ~~Nogo squares~~
            * *Bumping* sound when trying to go
        * ~~Looping map : (west is east, north is south, violets are blue, roses are red...)~~
* Sounds
    * ~~Create basic audio interface logging before linking to any lib~~
    * ~~Play sound~~
    * ~~Trim martreauhit sound~~
    * ~~Test playing 1 sound file twice at the same time~~ It appears to work
    * Rename audio files
    * Sound equalizers in conf file
        * to json
        * in menu
    * Equalize sounds
    * Sound format (with support ? webm/mp3/ogg/flac ?)
    * ~~Hear current square sound~~
        * Volumetric audio (stereo) with orientation
    * ~~Hear close squares sounds~~
        * ~~Hear second close squares sounds but softened~~
            * Check the attenuation formula ?
    * Theme/Style or instrument rather than whole music ?
* Fights
    * Life
        * ~~Heartbeat louder as life dims~~
            * *"Mouais... A revoir..."*
    * ~~~Turn based...~~~
        * ...or not
    * Gears of war
        * Differents weapons
        * Magic
        * Armor / Shield
    * Dynamic monsters
        * Appearing in the back
        * Following / Tracking / random / ...
        * Loud or silent
            * With 3d audio
    * Possibility to get pushed away
    * Fleeing
        * Proba
        * With damage
* Player
    * Timer clock *Ding* when a spell finished loading
    * Mana and stamina
        * Weariness (yawning ?)
            * Time before changing square and doing stuff
    * Cold / warmth / Wet / thristy (*aglagla*,...)
    * Bag
        * Weapons
        * Bonuses
        * Keys
* Boni (/bonuses) : (potions, enchantments)
    * ~~Instant~~
        * other types
            * random type
    * in Bag
    * static
    * Fade off sound ?
* Misc / Extern :
    * Documentation
    * Reference every extern sound and content with license
    * Deal with licenses (GPLv3 ?) and sublicenses compatibility
        * https://www.gnu.org/licenses/gpl-faq.fr.html
    * External repo for the sound/music
