import refData from '../static/references.js';

import {
    writeActivityLog
} from './activityLog.js';

let player;

export function populateReferences(_player) {
    'use strict';
    player = _player;
    let refsKeys = Object.keys(player.vars.refsUnlocked);
    let refs = [];
    refsKeys.forEach((e) => {
        if (player.vars.refsUnlocked[e] == true) {
            refs.push(e);
        }
    });

    let refsElements = [];
    for (let i = 0; i < refs.length; i++) {
        let refDataKeys = Object.keys(refData);
        if (refDataKeys.includes(refs[i])) {
            let refCard = document.createElement('div');
            refCard.classList.add('ref-card');

            let title = refData[refsKeys[i]].title;
            refCard.id = title.toLowerCase();
            let body = refData[refsKeys[i]].text;

            let titleElem = document.createElement('div');
            titleElem.classList.add('ref-card--title');
            titleElem.innerHTML = title;
            refCard.appendChild(titleElem);

            let bodyElem = document.createElement('div');
            bodyElem.classList.add('ref-card--body');
            bodyElem.innerHTML = body;
            refCard.appendChild(bodyElem);

            refsElements.push(refCard);
        }
    }

    let refPane = document.querySelector('#reference');
    refsElements.forEach((elem) => {
        if (refPane.querySelector(`#${elem.id}`) == null) {
            refPane.appendChild(elem); 
        }
    });
}

export function unlockReference(ref) {
    'use strict';
    player.vars.refsUnlocked[ref.toLowerCase()] = true;
    writeActivityLog('Reference unlocked: "' + ref + "\"");
    populateReferences(player);
}