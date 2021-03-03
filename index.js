const Sounds = require('./soundData.json')
module.exports = function jukebox(d) {

    // Used to spawn initial jukebox at your location.
    let loc;
    let w;
    let jukebox_spawned = true;
    // It is needed to quickly despawn and spawn the jukebox to start/stop the music, so I use a different loc/w to keep the jukebox in one place.
    let jukebox_loc;
    let jukebox_w;
    // hehehehe
    // Also readability. Kind of.
    let jukebox_gameid = 69420;
    let jukebox_templateid = 1179;
    let jukebox_huntingzoneid = 618

    /*################
    #### COMMANDS ####
    ################*/

    d.command.add('jukebox', {
        $none() {
            jukebox_spawned = !jukebox_spawned;
            d.command.message(`${jukebox_spawned? 'Despawning' : 'Spawning'} a jukebox!`)
            if(jukebox_spawned) { despawnNpc(jukebox_gameid)}
            if(!jukebox_spawned) { spawnNpc(jukebox_gameid, loc, w, jukebox_templateid, jukebox_huntingzoneid)}
        },
        $default() {
            d.command.message(`Invalid input.\nCommands:\njukebox : Spawns/Despawns a jukebox.\njukebox play (sound) : Plays a sound by filename. check soundData.json for available names.\njukebox mute : Stops current sound playing.\njukebox r : Reloads the module.`);
        },
        play(name) {
            spawnNpc(42070, jukebox_loc, jukebox_w, 1744, 618);
            playSoundFull(42070, name);
            d.command.message(`Playing sound: ${name}.`)
        },
        mute() {
            despawnNpc(42070);
            d.command.message(`Sound stopped.`)
        },
        r() {
            d.command.exec(`toolbox reload jukebox`)
        }
    });

    /*#############
    #### HOOKS ####
    #############*/

    d.hook('C_PLAYER_LOCATION', '*', (e) => { loc = e.loc, w = e.w });

    d.hook('S_SPAWN_NPC', '*', {filter: {fake: null} }, (e) => {
        if(e.gameId == jukebox_gameid) {
            jukebox_loc = e.loc;
            jukebox_w = e.w;
        }
    });

    d.hook('S_DESPAWN_NPC', '*', (e) => {
        if(e.gameId == jukebox_gameid) {
            jukebox_spawned = false;
        }
    });

    d.hook('C_NPC_CONTACT', '*', {filter: {fake: null} }, (e) => {
        if(e.gameId == jukebox_gameid) {
            emulateDialog(jukebox_gameid, 3006, 71, 10000, Sounds.Start.Buttons)
            return false;
        }
        
    });

    /* Why the fuck does this look so cancerous?
    > Let me explain. I could not think of a better way of doing this.
    > Buttons are broken down into several unique ids, which allows us to have nested button options.
    > The dialog window starts with the general categories, and pressing them will send you to the nested buttons.
    > I opted for nested button options because it declutters the window and organizes the sounds MUCH better.
    > No excuse for the gigantic switch statement. I just don't know much javascript. */

    d.hook('C_DIALOG', '*', {filter: {fake: null} }, (e) => {
        switch(e.id) {
            // Starting buttons
            case 10000:
                switch(e.index) {
                    case 1: emulateDialog(42069, 3006, 71, 20000, Sounds.Battle.Buttons); break;
                    case 2: emulateDialog(42069, 3006, 71, 30000, Sounds.City.Buttons); break;
                    case 3: emulateDialog(42069, 3006, 71, 40000, Sounds.Character_Theme.Buttons); break;
                    case 4: emulateDialog(42069, 3006, 71, 50000, Sounds.Dungeon.Buttons); break;
                    case 5: emulateDialog(42069, 3006, 71, 60000, Sounds.Expansion.Buttons); break;
                    case 6: emulateDialog(42069, 3006, 71, 70000, Sounds.Facility.Buttons); break;
                    case 7: emulateDialog(42069, 3006, 71, 80000, Sounds.Theme.Buttons); break;
                    case 8: despawnJukebox(); break;
                }
                break;
            // Battle buttons
            case 20000:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.Battle.Carol); d.command.message(`Now playing Carol BGM!`); break;
                    case 2: spawnJukebox(Sounds.Battle.Free_Fight); d.command.message(`Now playing Free Fight BGM!`); break;
                    case 3: spawnJukebox(Sounds.Battle.Guild_War); d.command.message(`Now playing Guild War BGM!`); break;
                    case 4: spawnJukebox(Sounds.Battle.Honor); d.command.message(`Now playing Honor BGM!`); break;
                    case 5: spawnJukebox(Sounds.Battle.Kumas); d.command.message(`Now playing Kumas BGM!`); break;
                    case 6: spawnJukebox(Sounds.Battle.War_Awaken); d.command.message(`Now playing War Awaken BGM!`); break;   
                }
                break;
            // City starting buttons
            case 30000:
                switch(e.index) {
                    case 1: emulateDialog(42069, 3006, 71, 30001, Sounds.City.Southern_Arun.Buttons); break;
                    case 2: emulateDialog(42069, 3006, 71, 30002, Sounds.City.Southern_Shara.Buttons); break;
                    case 3: emulateDialog(42069, 3006, 71, 30003, Sounds.City.Northern_Shara.Buttons); break;
                    case 4: emulateDialog(42069, 3006, 71, 30004, Sounds.City.Miscellaneous.Buttons); break;
                }
                break;
            // Southern Arun city buttons
            case 30001:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.City.Southern_Arun.Castanica); d.command.message(`Now playing Castanica BGM!`); break;
                    case 2: spawnJukebox(Sounds.City.Southern_Arun.Chebika); d.command.message(`Now playing Chebika BGM!`); break;
                    case 3: spawnJukebox(Sounds.City.Southern_Arun.Crescentia); d.command.message(`Now playing Crescentia BGM!`); break;
                    case 4: spawnJukebox(Sounds.City.Southern_Arun.Cutthroat_Harbor); d.command.message(`Now playing Cutthroat Harbor BGM!`); break;
                    case 5: spawnJukebox(Sounds.City.Southern_Arun.Lumbertown); d.command.message(`Now playing Lumbertown BGM!`); break;
                    case 6: spawnJukebox(Sounds.City.Southern_Arun.Popolion); d.command.message(`Now playing Popolion BGM!`); break;
                    case 7: spawnJukebox(Sounds.City.Southern_Arun.Pora_Elinu); d.command.message(`Now playing Pora Elinu BGM!`); break;
                    case 8: spawnJukebox(Sounds.City.Southern_Arun.Tulufan); d.command.message(`Now playing Tulufan BGM!`); break;
                    case 9: spawnJukebox(Sounds.City.Southern_Arun.Velika); d.command.message(`Now playing Velika BGM!`); break;
                }
                break;
            // Southern Shara city buttons
            case 30002:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.City.Southern_Shara.Acarum); d.command.message(`Now playing Acarum BGM!`); break;
                    case 2: spawnJukebox(Sounds.City.Southern_Shara.Allemantheia); d.command.message(`Now playing Allemantheia BGM!`); break;
                    case 3: spawnJukebox(Sounds.City.Southern_Shara.Bastion); d.command.message(`Now playing Bastion BGM!`); break;
                    case 4: spawnJukebox(Sounds.City.Southern_Shara.Bleakrock); d.command.message(`Now playing Bleakrock BGM!`); break;
                    case 5: spawnJukebox(Sounds.City.Southern_Shara.Elenea); d.command.message(`Now playing Elenea BGM!`); break;
                    case 6: spawnJukebox(Sounds.City.Southern_Shara.Frontera); d.command.message(`Now playing Frontera BGM!`); break;
                    case 7: spawnJukebox(Sounds.City.Southern_Shara.Tralion); d.command.message(`Now playing Tralion BGM!`); break;
                    case 8: spawnJukebox(Sounds.City.Southern_Shara.Tria); d.command.message(`Now playing Tria BGM!`); break;
                }
                break;
            // Northern Shara city buttons
            case 30003:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.City.Northern_Shara.Dragonfall); d.command.message(`Now playing Dragonfall BGM!`); break;
                    case 2: spawnJukebox(Sounds.City.Northern_Shara.Habere); d.command.message(`Now playing Habere BGM!`); break;
                    case 3: spawnJukebox(Sounds.City.Northern_Shara.Kaiator); d.command.message(`Now playing Kaiator BGM!`); break;
                    case 4: spawnJukebox(Sounds.City.Northern_Shara.Kanstria); d.command.message(`Now playing Kanstria BGM!`); break;
                    case 5: spawnJukebox(Sounds.City.Northern_Shara.Pathfinder_Post); d.command.message(`Now playing Pathfinder Post BGM!`); break;
                    case 6: spawnJukebox(Sounds.City.Northern_Shara.Scythera_Fae); d.command.message(`Now playing Scythera Fae BGM!`); break;
                    case 7: spawnJukebox(Sounds.City.Northern_Shara.Zulfikar_Fortress); d.command.message(`Now playing Zulfikar Fortress BGM!`); break;
                }
                break;
            // Miscellaneous city buttons
            case 30004:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.City.Miscellaneous.Hidden_Village); d.command.message(`Now playing Hidden Village BGM!`); break;
                    case 2: spawnJukebox(Sounds.City.Miscellaneous.Island_Of_Dawn); d.command.message(`Now playing Island of Dawn BGM!`); break;
                    case 3: spawnJukebox(Sounds.City.Miscellaneous.North_WatchTower); d.command.message(`Now playing North Watchtower BGM!`); break;
                }
                break;
            // Character theme buttons
            case 40000:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.Character_Theme.Aman); d.command.message(`Now playing Aman character theme BGM!`); break;
                    case 2: spawnJukebox(Sounds.Character_Theme.Baraka); d.command.message(`Now playing Baraka character theme BGM!`); break;
                    case 3: spawnJukebox(Sounds.Character_Theme.Castanic); d.command.message(`Now playing Aman character theme BGM!`); break;
                    case 4: spawnJukebox(Sounds.Character_Theme.Elin); d.command.message(`Now playing Elin character theme BGM!`); break;
                    case 5: spawnJukebox(Sounds.Character_Theme.High_Elf); d.command.message(`Now playing High Elf character theme BGM!`); break;
                    case 6: spawnJukebox(Sounds.Character_Theme.Human); d.command.message(`Now playing Human character theme BGM!`); break;
                    case 7: spawnJukebox(Sounds.Character_Theme.Popori); d.command.message(`Now playing Popori character theme BGM!`); break;
                }
                break;
            // Dungeon buttons
            case 50000:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.Dungeon.Battle); d.command.message(`Now playing Generic Battle BGM!`); break;
                    case 2: spawnJukebox(Sounds.Dungeon.Named); d.command.message(`Now playing Generic Named Battle BGM!`); break;
                    case 3: spawnJukebox(Sounds.Dungeon.Flower_Garden); d.command.message(`Now playing Flower Garden Battle BGM!`); break;
                    case 4: spawnJukebox(Sounds.Dungeon.TBA); d.command.message(`Now playing TBA BGM!`); break;
                    case 5: spawnJukebox(Sounds.Dungeon.Valona); d.command.message(`Now playing Valona BGM!`); break;
                }
                break;
            // Expansion starting buttons
            case 60000:
                switch(e.index) {
                    case 1: emulateDialog(42069, 3006, 71, 60001, Sounds.Expansion.Ambience.Buttons); break;
                    case 2: emulateDialog(42069, 3006, 71, 60002, Sounds.Expansion.City_Town.Buttons); break;
                }
                break;
            // Expansion ambience buttons
            case 60001:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.Expansion.Ambience.Cave); d.command.message(`Now playing Cave ambience BGM!`); break;
                    case 2: spawnJukebox(Sounds.Expansion.Ambience.Electro); d.command.message(`Now playing Electro ambience BGM!`); break;
                    case 3: spawnJukebox(Sounds.Expansion.Ambience.Electro2); d.command.message(`Now playing Electro 2 ambience BGM!`); break;
                    case 4: spawnJukebox(Sounds.Expansion.Ambience.Forest); d.command.message(`Now playing Forest ambience BGM!`); break;
                    case 5: spawnJukebox(Sounds.Expansion.Ambience.Forest2); d.command.message(`Now playing Forest 2 ambience BGM!`); break;
                }
                break;
            // Expansion city/town buttons
            case 60002:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.Expansion.City_Town.Evil); d.command.message(`Now playing Evil City/Town BGM!`); break;
                    case 2: spawnJukebox(Sounds.Expansion.City_Town.Hunters); d.command.message(`Now playing Hunters City/Town BGM!`); break;
                    case 3: spawnJukebox(Sounds.Expansion.City_Town.Nomad); d.command.message(`Now playing Nomad City/Town BGM!`); break;
                    case 4: spawnJukebox(Sounds.Expansion.City_Town.Pub); d.command.message(`Now playing Pub City/Town BGM!`); break;
                    case 5: spawnJukebox(Sounds.Expansion.City_Town.Pub2); d.command.message(`Now playing Pub 2 City/Town BGM!`); break;
                    case 6: spawnJukebox(Sounds.Expansion.City_Town.Ruins); d.command.message(`Now playing Ruins City/Town BGM!`); break;
                    case 7: spawnJukebox(Sounds.Expansion.City_Town.Seashore); d.command.message(`Now playing Seashore City/Town BGM!`); break;
                    case 8: spawnJukebox(Sounds.Expansion.City_Town.SkyAir); d.command.message(`Now playing Sky Air City/Town BGM!`); break;
                    case 9: spawnJukebox(Sounds.Expansion.City_Town.SkyAir2); d.command.message(`Now playing Sky Air 2 City/Town BGM!`); break;
                }
                break;
            // Facility starting buttons
            case 70000:
                switch(e.index) {
                    case 1: emulateDialog(42069, 3006, 71, 70001, Sounds.Facility.Allemantheia.Buttons); break;
                    case 2: emulateDialog(42069, 3006, 71, 70002, Sounds.Facility.Kaiator.Buttons); break;
                    case 3: emulateDialog(42069, 3006, 71, 70003, Sounds.Facility.Velika.Buttons); break;
                }
                break;
            // Facility Allemantheia buttons
            case 70001:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.Facility.Allemantheia.Agit); d.command.message(`Now playing Allemantheia Agit BGM!`); break;
                    case 2: spawnJukebox(Sounds.Facility.Allemantheia.Blacksmith); d.command.message(`Now playing Allemantheia Blacksmith BGM!`); break;
                    case 3: spawnJukebox(Sounds.Facility.Allemantheia.Club_House); d.command.message(`Now playing Allemantheia Club House BGM!`); break;
                    case 4: spawnJukebox(Sounds.Facility.Allemantheia.Item_Store); d.command.message(`Now playing Allemantheia Item Store BGM!`); break;
                    case 5: spawnJukebox(Sounds.Facility.Allemantheia.Pet_Store); d.command.message(`Now playing Allemantheia Pet Store BGM!`); break;
                    case 6: spawnJukebox(Sounds.Facility.Allemantheia.Magician); d.command.message(`Now playing Allemantheia Magician Academy BGM!`); break;
                    case 7: spawnJukebox(Sounds.Facility.Allemantheia.Warehouse); d.command.message(`Now playing Allemantheia Warehouse BGM!`); break;
                    case 8: spawnJukebox(Sounds.Facility.Allemantheia.Warrior); d.command.message(`Now playing Allemantheia Warrior Academy BGM!`); break;
                }
                break;
            // Facility Kaiator buttons
            case 70002:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.Facility.Kaiator.Agit); d.command.message(`Now playing Kaiator Agit BGM!`); break;
                    case 2: spawnJukebox(Sounds.Facility.Kaiator.Blacksmith); d.command.message(`Now playing Kaiator Blacksmith BGM!`); break;
                    case 3: spawnJukebox(Sounds.Facility.Kaiator.Club_House); d.command.message(`Now playing Kaiator Club House BGM!`); break;
                    case 4: spawnJukebox(Sounds.Facility.Kaiator.Item_Store); d.command.message(`Now playing Kaiator Item Store BGM!`); break;
                    case 5: spawnJukebox(Sounds.Facility.Kaiator.Pet_Store); d.command.message(`Now playing Kaiator Pet Store BGM!`); break;
                    case 6: spawnJukebox(Sounds.Facility.Kaiator.Magician); d.command.message(`Now playing Kaiator Magician Academy BGM!`); break;
                    case 7: spawnJukebox(Sounds.Facility.Kaiator.Warehouse); d.command.message(`Now playing Kaiator Warehouse BGM!`); break;
                    case 8: spawnJukebox(Sounds.Facility.Kaiator.Warrior); d.command.message(`Now playing Kaiator Warrior Academy BGM!`); break;
                }
                break;
            // Facility Velika buttons
            case 70003:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.Facility.Velika.Agit); d.command.message(`Now playing Velika Agit BGM!`); break;
                    case 2: spawnJukebox(Sounds.Facility.Velika.Blacksmith); d.command.message(`Now playing Velika Blacksmith BGM!`); break;
                    case 3: spawnJukebox(Sounds.Facility.Velika.Club_House); d.command.message(`Now playing Velika Club House BGM!`); break;
                    case 4: spawnJukebox(Sounds.Facility.Velika.Item_Store); d.command.message(`Now playing Velika Item Store BGM!`); break;
                    case 5: spawnJukebox(Sounds.Facility.Velika.Pet_Store); d.command.message(`Now playing Velika Pet Store BGM!`); break;
                    case 6: spawnJukebox(Sounds.Facility.Velika.Magician); d.command.message(`Now playing Velika Magician Academy BGM!`); break;
                    case 7: spawnJukebox(Sounds.Facility.Velika.Warehouse); d.command.message(`Now playing Velika Warehouse BGM!`); break;
                    case 8: spawnJukebox(Sounds.Facility.Velika.Warrior); d.command.message(`Now playing Velika Warrior Academy BGM!`); break;
                }
                break;
            // Theme bgms
            case 80000:
                switch(e.index) {
                    case 1: spawnJukebox(Sounds.Theme.Adventure); d.command.message(`Now playing Adventure theme BGM!`); break;
                    case 2: spawnJukebox(Sounds.Theme.Amusement_Park); d.command.message(`Now playing Amusement Park theme BGM!`); break;
                    case 3: spawnJukebox(Sounds.Theme.Amusement_Park2); d.command.message(`Now playing Amusement Park 2 theme BGM!`); break;
                    case 4: spawnJukebox(Sounds.Theme.Credits); d.command.message(`Now playing Credits theme BGM!`); break;
                    case 5: spawnJukebox(Sounds.Theme.Fantasy); d.command.message(`Now playing Fantasy theme BGM!`); break;
                    case 6: spawnJukebox(Sounds.Theme.Fantasy2); d.command.message(`Now playing Fantasy 2 theme BGM!`); break;
                    case 7: spawnJukebox(Sounds.Theme.Insect_Shell); d.command.message(`Now playing Insect Shell theme BGM!`); break;
                    case 8: spawnJukebox(Sounds.Theme.Insect_Shell2); d.command.message(`Now playing Insect Shell 2 theme BGM!`); break;
                    case 9: spawnJukebox(Sounds.Theme. Intro); d.command.message(`Now playing Intro theme BGM!`); break;
                    case 10: spawnJukebox(Sounds.Theme.Lobby); d.command.message(`Now playing Lobby theme BGM!`); break;
                    case 11: spawnJukebox(Sounds.Theme.Lobby2); d.command.message(`Now playing Lobby 2 theme BGM!`); break;
                }
                break;
                return false;
            }
    });

    /*#################
    #### FUNCTIONS ####
    #################*/

    /* Seriously dude, what the fuck?
    > Okay, I know this looks bad.
    > In general, sounds are attached to a fake npc gameId that I spawn so that I can end the sound whenever I want by despawning the npc.
    > The reason the timeouts are here are because sometimes a sound will not play even after the npc is despawned and everything seems fine.
    > When it does that, it means you either have to press a sound button twice, or just do it twice with one press :)
    > I purposefully made the timeout delays short so that the jukebox stays spawned for as long as possible.
    > Also, it might still break when you stop the music and despawn the jukebox. I have no idea why. */

    function spawnJukebox(cue) {
        despawnNpc(42070)
        d.setTimeout(() => { spawnNpc(42070, jukebox_loc, jukebox_w, 1744, 618) }, 100);
        d.setTimeout(() => { addEffect(jukebox_gameid, 250030017) }, 110);
        d.setTimeout(() => { playSoundFull(42070, cue) }, 120);
        d.setTimeout(() => { despawnNpc(42070) }, 130);
        d.setTimeout(() => { spawnNpc(42070, jukebox_loc, jukebox_w, 1744, 618) }, 150);
        d.setTimeout(() => { addEffect(jukebox_gameid, 250030017) }, 160);
        d.setTimeout(() => { playSoundFull(42070, cue) }, 180);
    }

    function despawnJukebox() {
        despawnNpc(42070);
        despawnNpc(jukebox_gameid)
        removeEffect(jukebox_gameid, 250030017);
        d.setTimeout(() => { spawnNpc(jukebox_gameid, jukebox_loc, jukebox_w, 1179, 618)}, 50)
        d.command.message(`Music Stopped!`);
    }

    function emulateDialog(gameId, key1, key2, id, buttons) {
        d.send('S_DIALOG', 3, {
            gameId: gameId,
            type: 1,
            key1: key1,
            key2: key2,
            questTaskId: 0,
            textId: 1,
            id: id,
            buttons: buttons
        });
    }

    // This is how sounds are sent. You could attach this to a command and use your own gameId, but then you can't end the sound without exiting your client.
    // There are more sound filenames than what I've provided in soundData.json. I just picked the ones I liked. Dump the DC for them or look into GPKs if you want other ones.
    function playSoundFull(gameId, cue) {
        d.send('S_PLAY_SOUND_BYNAME', 3, {
            gameId: gameId,
            volume: 10,
            range: 1,
            pitch: 1,
            name: cue
        });
    }

    // This adds a cute music playing visual effect to the chest npc
    function addEffect(gameId, effect) {
        d.setTimeout(() => {
            d.send('S_PLAY_EFFECT', 1, {
                gameId: gameId,
                id: effect
            });
        }, 100);
    }

    function removeEffect(gameId, effect) {
        d.send('S_REMOVE_EFFECT', 1, {
            gameId: gameId,
            name: effect
        });
    }

    function despawnNpc(gameId) {
        d.send('S_DESPAWN_NPC', 3, {
            gameId: gameId,
            type: 1,
            unk: 0
        });
    }

    function spawnNpc(gameId, loc, w, templateId, huntingZoneId) {
        d.send('S_SPAWN_NPC', 12, {
            gameId: gameId,
            loc: loc,
            w: w,
            relation: 12,
            templateId: templateId,
            huntingZoneId: huntingZoneId,
        });
    }
}
