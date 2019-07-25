import {
    loadSubLocation,
    loadSuperLocation,
    hideButtons,
    showButtons,
    setMinimapTravel
} from "./locationManager.js";
import behindPub from '../locations/city/tavern/tavern_behind.js'
import Tavern from "../locations/city/tavern/Tavern.js";

import { forceTalkToWithDialogue } from "./conversation.js";
import { NPC } from "./NPC.js";
import rivalData from '../chars/rival.js';
import rivalDialogue from '../chars/dialogues/prologue_rival.js';
import { writeActivityLog } from "./activityLog.js";

import { Item } from "./item.js";

import misc from '../items/misc.js';




export function startPrologue(player) {
    'use strict';
    loadSuperLocation(Tavern);
    loadSubLocation(behindPub);
    hideButtons();
    setMinimapTravel(false);

    player.vars.inPrologueEvent = true;

    player.rival = new NPC(rivalData);

    forceTalkToWithDialogue(player.rival, rivalDialogue, player);
    
}

export function continuePrologue(player) {
    'use strict';
    writeActivityLog(player.rival.vars.actorName + ' leaves you at 1 hit point, lying in the dirt. You see her smirk in as she struts away.');
    let reliquaryMap = new Item(misc.reliquary_map);
    player.addItemToInventory(reliquaryMap);
}

export function checkForRandomEvent(location) {

}

export function randomCombatEvent(player) {

}