Misc
====
* FIRST : **Order TODO !**
* Play sound
* Test playing 1 sound file twice at the same time
* Get user input
* Reference every sounds
* Bq theme
* Env files to js script ? security ? sandbox ?
* Reference every extern sound and content with license
* Deal with licenses (GPLv3 ?) and sublicenses compatibility
    https://www.gnu.org/licenses/gpl-faq.fr.html

Features to add
===============
* Files
    * Maps
        * **maps to JSON directly ?**
        * Open file (map) with nodeJs
        * download file (map) in js
        * import local ? (drag and drop ?)
    * Save/Load
        * local
            * load (drag and drop ?)
        * Online ?
    * Config
        * Square types, sounds, voices...
* Interface
    * Easily translatable
    * Non disturbing visual interface 
        * keep Bq theme *but*
            don't hurt eyes displaying smtg (you can play with closed eyes)
    * Help
        * Ingame :
            * Voice ?
            * displayable
        * Wiki (github)
    * Save / Load locally
        * Online
    * Simple onomatopoeia appearing on the blank page
    * Fullscreen
    * Mute button
    * Pause (and mute ?)
    * Character describing what's happening ?
        ex : "Damn it ! The effects of *potion* are nearly off."
        * Or sidekick
* Environment
    * Load map
    * Map editor
    * Day/Night ?
    * Slow death squares : Quicksand (sable mouvant)/...
    * Places
        * Dungeons
            * Open/Unlock/Close doors
                * Key
                * Pick ?
                * Break ?
                * Jam ? (prevent enemies from coming in)
            * Timed events *tic tac*
            * Buttons / Levers / ...
            * Pressplates : *click* when stepping on it
        * Towns
            * NPCs
                * Voices
                * Interactions (selection mode ?)
                    * Exange/Sell/Buy
                        * Money ?
            * Inns
                * Sleep
                    * Mana ? Stamina ? bonus ?
* Move around with arrows
    * Touch (mobile) support
    * 3d ? (df style)
        * command to get position (=> number of *bip*s)
    * Change orientation
        * *Ding* when facing North (or West)
    * Map
        * Letal squares
        * Nogo squares
            * *Bumping* sound when trying to go
        * Looping map : (west is east, north is south, violets are blue, roses are blue...)
* Sounds :
    * Hear current square sound
        * Volumetric audio (stereo) with orientation
    * Hear close squares sounds
        * Hear second close squares sounds but softened
* Fights
    * Life
        * Heartbeat louder as life dims
    * Turn based or not
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
    * Instant + in Bag + static
    * Fade off sound ?
