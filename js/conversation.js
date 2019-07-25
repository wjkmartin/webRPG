import {
    writeActivityLog
} from "./activityLog.js";
import {
    changeDesc,
    changeButtons
} from "./mainDisplay.js";
import {
    populateReferences
} from './referencesManager.js';

let activeActor = {};
let player = {};



export function converseWith(actor, _player) {
    'use strict';
    activeActor = actor;

    player = _player;
    
    if (activeActor.vars.class == 'bandit') {
        writeActivityLog('The bandit refuses to talk with you!');
    } else {
        meetNPC();
    }
}

export function forceTalkToWithDialogue(actor, dialogue, _player) {
    'use strict';
    activeActor = actor;
    
    player = _player;
    activeActor.vars.dialogueTree = dialogue;
    createRespNodes(activeActor.vars.dialogueTree.meet);
    changeDesc(activeActor.vars.dialogueTree.meet.text);
}

function meetNPC() {
    'use strict';
    writeActivityLog('You start talking with ' + activeActor.vars.actorName + '.');
    createRespNodes(activeActor.vars.dialogueTree.meet);
    changeDesc(activeActor.vars.dialogueTree.meet.text);
}

function createRespNodes(nodeObj) {
    'use strict';
    
    populateReferences(player);
    if ('onclick' in nodeObj) {
        nodeObj.onclick(player, activeActor); //using these two arguments plus imports you can do basically anything from within function calls in the dialogues.
    }
    let nodeList = nodeObj.pointers;
    let buttons = [];
    for (let i = 0; i < Object.keys(nodeList).length; i++) { //iterate through all the possible buttons for the node
        let button = document.createElement('button');
        let pointer = Object.keys(nodeList)[i];
        let text = Object.values(nodeList)[i];
        button.innerHTML = text;
        button.id = pointer;
        if ('requirements' in nodeObj) {
            let reqs = nodeObj.requirements;
            for (let n = 0; n < Object.keys(reqs).length; n++) {
                const e = Object.keys(reqs)[n];
                const requirement = Object.values(reqs)[n]; //this is an array e.g. ['charisma', 15]
                if (player.vars[requirement[0]] >= requirement[1]) {
                    buttons.push(button);
                    button.addEventListener('click', clickOnNode, false);
                } else {
                    button.style.opacity = 0.4;
                    button.statReq = requirement[0];
                    button.statReqValue = requirement[1];
                    button.addEventListener('click', clickOnNodeFailStatCheck, false);
                    buttons.push(button);
                }
            }
        } else {
            buttons.push(button);
            button.addEventListener('click', clickOnNode, false);
        }

    }
    changeButtons(buttons, false);
}

function clickOnNodeFailStatCheck(event) {
    'use strict';
    let stat = event.target.statReq;
    let val = event.target.statReqValue;
    writeActivityLog('You need at least ' + val + ' ' + stat + ' to choose this response');
}


function clickOnNode(event) {
    'use strict';
    let activeConversationNode = activeActor.vars.dialogueTree[event.target.id];
    if (Object.keys(activeConversationNode).includes('action')) {
        switch (activeConversationNode.action) {
            case 'startCombat':
                player.startCombat(activeActor);
        }
    } else {
        let text = activeConversationNode.text;
        changeDesc(text);
        createRespNodes(activeConversationNode);
    }

}