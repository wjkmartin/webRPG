import {
    updateActorUI
} from "./UI.mjs";
import {
    focusOnItem
} from "./UI.mjs";

import {
    writeActivityLog
} from "./activityLog.js";

import {
    boundMethod2
} from './locationManager.js';


let boundMethod = loadActorInteraction.bind(this);


let player;
let activeActor = '';
let activeActorName = '';

let _player;

let actorsList = [];

export function stageActor(actor) {
    'use strict';
    actorsList.push(actor);
    
}

export function stagePlayer(player) {
    'use strict';
    _player = player;
}

export function prepActorByLink(elem) {
    'use strict';
    
    addClickListener(elem);
}

function focusActorWindowOn(actor) {
    'use strict';
    activeActorName = actor.vars.actorName;
    activeActor = actor;
    updateActorUI(actor);
}

export function defocusActorWindow() {
    'use strict';
    updateActorUI('');
}

function addClickListener(e) {
    'use strict';
    e.addEventListener('click', boundMethod, false);
}

function loadActorInteraction(event) {
    'use strict';
    let _actor = actorsList.find((e) => {
        return e.vars.actorName == event.target.innerHTML;
    });
    focusActorWindowOn(_actor);

    let str = "You approach " + _actor.vars.actorName; + ".";
    writeActivityLog(str, 'normal');
}

export function createListeners() {
    'use strict';
    let elemReqDuel = document.querySelector('#request-duel');
    let elemTalkTo = document.querySelector('#talk-to');
    let elemTrade = document.querySelector('#trade');
    let elemAddFriend = document.querySelector('#add-friend');

    elemReqDuel.addEventListener("click", _requestDuel, false);
    elemTalkTo.addEventListener("click", _talkTo, false);
    elemTrade.addEventListener("click", _trade, false);
    elemAddFriend.addEventListener("click", _addFriend, false);
}

export function createSubLocationListeners(buttons) {
    'use strict';
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", boundMethod2, false);
    }
}

function createEquipmentListener() {

}

function _requestDuel() {
    'use strict';
    activeActor.requestDuel(_player);
}

function _talkTo() {
    'use strict';
    activeActor.talkTo(_player);
}

function _trade() {
    'use strict';
    activeActor.trade(_player);
}

function _addFriend() {
    'use strict';
    activeActor.addFriend(_player);
}

export function clickItemInv(event) {
    'use strict';
    focusOnItem(event.target.itemRef, 'inventory');
}

export function clickItemEquip(event) {
    'use strict';
    focusOnItem(event.target.thisSlot, 'equipment');
}