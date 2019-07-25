let buttons = [];

import {
    unlockReference
} from './referencesManager.js';

export function changeImage() {

}

export function changeDesc(str) {
    'use strict';
    let p = document.querySelector('#main-text-area');
    let ptrn = /\$(\w*)\$/g;
    var match;
    let matches = [];
    let matchedIDs = [];
    let modifiedStr = '';

    while ((match = ptrn.exec(str)) != null) {
        matches.push(match);
    }
    if (matches[0] != undefined) {
        for (let i = 0; i < matches.length; i++) {
            matchedIDs.push(matches[i][1]);
            if (i === 0) {
                modifiedStr += str.slice(0, matches[0].index);
            }
            modifiedStr += `<a href=\'#\' class='ref-link' id='ref-${matches[i][1].toLowerCase()}'>` + matches[i][1] + '</a>';
            if (i == matches.length - 1) {
                modifiedStr += str.slice(matches[i].index + matches[i][0].length, );
            } else {
                modifiedStr += str.slice(matches[i].index + matches[i][0].length, matches[i + 1].index)
            }
        }
        p.innerHTML = modifiedStr;
    } else {
        p.innerHTML = str;
    }
    matchedIDs.forEach((id) => {
        unlockReference(id);
        p.addEventListener('click', clickOnReferenceLink, false);
    });
}

function clickOnReferenceLink(event) {
    'use strict';
    let refID = event.target.id.slice(4, );
    let p = document.querySelector('.codex-container-body');
    if (refID != '-text-area') {
        $('#codex-tab').tab('show'); //I had to use a little jQuery here to interact with BS tabs
        $('#reference-tab').tab('show');
        let referenceContent = document.querySelector('#reference');
        referenceContent.childNodes.forEach((node) => {
            if (node.id == refID) {
                let e = document.querySelector(`#${node.id}`);
                e.scrollIntoView();
            }
        });
    }


}

export function changeButtons(buttons, isLocation) { //pass this an array of buttons DOM elements and a boolean
    'use strict';
    let container = document.querySelector('#main-button-area');
    if (buttons != '') {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        for (let i = 0; i < buttons.length; i++) {
            if (isLocation) {
                buttons[i].classList.add('location-button');

            }
            container.appendChild(buttons[i]);
        }
    } else {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

}