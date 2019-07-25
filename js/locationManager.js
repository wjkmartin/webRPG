import {
    updateActiveCharList
} from './UI.mjs';

import {
    NPC
} from "./NPC.js";
import {
    stageActor,
    stagePlayer
} from './stateManager.js';

import arinya from '../chars/arinya.js';
import javik from '../chars/javik.js';
import ajwar from '../chars/ajwar.js'; //ADD NEW CHARACTER IMPORTS WITH THESE
import bandit_queen from '../chars/bandit_queen.js';

import city from '../maps/city.js';
import field from '../maps/field.js';

import gatehouseEast from '../locations/field/GatehouseEast/GatehouseEast.js';
import gatehouseWest from '../locations/city/GatehouseWest/GatehouseWest.js';



import {
    defocusActorWindow,
    createSubLocationListeners
} from './stateManager.js';

import {
    changeDesc,
    changeButtons
} from './mainDisplay.js';

import {
    loadMap, flagClickables
} from './minimapv2.js';


export let boundMethod2 = handleSubLocationClick.bind(this);
const MASTER_CHAR_LIST = [ajwar, arinya, javik, bandit_queen]; //YOU MUST UPDATE THIS WHEN YOU WANT A NEW CHARACTER

let activeActors = [];
let actorsByLocation = {};

let currentLocation;
let _player;

let locationList = [];

let activeButtons = [];

export function initWorldChars(player) {
    'use strict';
    _player = player;
    for (let i = 0; i < MASTER_CHAR_LIST.length; i++) {
        activeActors[i] = new NPC(MASTER_CHAR_LIST[i]);
        stageActor(activeActors[i]);
    }
    stagePlayer(player);

    let bandit = NPC.generateRandomNpcOfType('bandit');
    activeActors.push(bandit);
    stageActor(bandit);
    defocusActorWindow();
}

export function updateLocationList(loc) {
    'use strict';
    defocusActorWindow();
    locationList.push(loc);
}

function updateCharsAtLocations(locOb) {
    'use strict';

    actorsByLocation[locOb.name] = [];
    _player.vars.currentLocation = locOb;


    let foo = activeActors
        .filter(function (a) { //only returns first name
            return a.vars.location == locOb.name;
        })
        .map(x => x.vars.actorName);
    if (foo != undefined) {
        updateActiveCharList(foo);
    }
}

function loadButtonsForLoc(locOb) {
    'use strict';

    let buttonElems = [];

    for (let i = 0; i < locOb.buttons.length; i++) {
        if (locOb.buttons[i] == 'super') {
            let e = document.createElement('button');
            e.locationRef = currentLocation;
            e.innerHTML = currentLocation.buttonLabel;
            buttonElems.push(e);
        } else {
            let e = document.createElement('button');
            e.locationRef = locOb.buttons[i];
            e.innerHTML = locOb.buttons[i].buttonLabel;
            buttonElems.push(e);
        }
    }
    return buttonElems;
}

export function loadLocation(locOb) {
    'use strict';
    if (locOb.type == 'super') {
        setMinimapTravel(true);
        loadSuperLocation(locOb);
    } else if (locOb.type == 'sub') {
        setMinimapTravel(false);
        loadSubLocation(locOb);
    } else if (locOb.type == 'transition') {
        loadMap(eval(locOb.mapLink), eval(locOb.entrypoint));
        loadLocation(eval(locOb.entrypoint));
    }

}

export function loadSuperLocation(locOb) {
    'use strict';
    currentLocation = locOb;
    currentLocation.type = 'super';
    
    updateCharsAtLocations(locOb);

    locOb.description1 != undefined ?  changeDesc(locOb.description1) : '';
   

    if (locOb.buttons != undefined) {
        activeButtons = loadButtonsForLoc(locOb);
        changeButtons(activeButtons, true);
        createSubLocationListeners(activeButtons);
    } else {
        changeButtons('');
    }

    if (!_player.vars.visited.includes(locOb.name)) {
        if ((locOb.name != 'h-road') && (locOb.name != 'v-road') && (locOb.name != 'cross-road')) {
            _player.vars.visited.push(locOb.name);
        }
    }
    defocusActorWindow();
}

function handleSubLocationClick(event) {
    'use strict';
    let locOb = event.target.locationRef;
    
    loadLocation(locOb);
}

export function loadSubLocation(locOb) {
    'use strict';

    updateCharsAtLocations(locOb);
    
    if (locOb.buttons != undefined) {
        activeButtons = loadButtonsForLoc(locOb);
        changeButtons(activeButtons, true);
        createSubLocationListeners(activeButtons);
    } else {
        changeButtons('');
    }

    locOb.description1 != undefined ? changeDesc(locOb.description1) : '';
    

    if (!_player.vars.visited.includes(locOb.name)) {
        if ((locOb.name != 'h-road') && (locOb.name != 'v-road') && (locOb.name != 'cross-road')) {
            _player.vars.visited.push(locOb.name);
        }
    }
    
    defocusActorWindow();
}

export function setMinimapTravel(bool) {
    'use strict';
    _player.vars.canTravelOnMinimap = bool;
    flagClickables(_player);
}

export function hideButtons() {
    'use strict';
    activeButtons.forEach(function(element) {
        element.style.visibility = 'hidden';
    });
}

export function showButtons() {
    'use strict';
    activeButtons.forEach(function(element) {
        element.style.visibility = '';
    });

}

