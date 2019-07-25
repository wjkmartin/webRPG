import city from '../maps/city.js';
import field from '../maps/field.js';
import road from '../locations/city/Road.js';

import tavernBehind from '../locations/city/tavern/tavern_behind.js';

import {
    updateLocationList,
    loadLocation
} from './locationManager.js';

import {
    updateLocationBasedElems
} from './UI.mjs';

let _clickables = [];
let _player = '';


export function initMinimap(player) {
    'use strict';
    _player = player;
    loadMap(city, tavernBehind);
}

export function loadMap(map, entrypoint) {
    'use strict';
    _player.vars.currentMap = map;
    _player.vars.currentLocation = entrypoint;
    _player.vars.coords = entrypoint.coords;
    updateIcons();

    document.querySelector('#minimap-img').src = map.img;
}



function updateIcons() {
    'use strict';
    let map = _player.vars.currentMap;
    let nodes = map.nodes;

    for (let row in nodes) { //this will set all the icons on the minimap
        if (!nodes.hasOwnProperty(row)) continue;

        let node = nodes[row];
        for (let prop in node) {
            if (!node.hasOwnProperty(prop)) continue;
            let str = `minimap-node-${row}-${prop}`;
            let e = document.getElementById(str);
            e.classList = 'minimap-node';
            e.style.color = 'black';

            if (node[prop] != 'none') {
                updateLocationList(node[prop]);
            }

            if (node[prop] == 'none') {
                e.className = 'minimap-node empty-node';
            } else {
                let iconList = node[prop].icon;
                iconList.forEach((elem) => {
                    e.classList.add(elem);
                });
                node[prop].coords = [parseInt(row), parseInt(prop)];
            }
            e.locationName = node[prop];
        }
    }
    flagClickables();
}

export function flagClickables() {
    'use strict';
    let pvc = _player.vars.coords;

    let playerElement = document.getElementById(`minimap-node-${pvc[0]}-${pvc[1]}`);
    playerElement.classList = 'minimap-node';
    playerElement.classList.add('fas');
    playerElement.classList.add('fa-user');

    for (let i = 0; i < _clickables.length; i++) {
        removeClickListener(_clickables[i]);
    }
    _clickables = [];

    let leftClickable = false;
    let rightClickable = false;
    let topClickable = false;
    let bottomClickable = false;

    let leftElement;
    let rightElement;
    let topElement;
    let bottomElement;

    if (pvc[1] > 0) {
        leftClickable = true;
        leftElement = document.getElementById(`minimap-node-${pvc[0]}-${pvc[1] - 1}`);
    }

    if (pvc[1] < 7) {
        rightClickable = true;
        rightElement = document.getElementById(`minimap-node-${pvc[0]}-${pvc[1] + 1}`);
    }

    if (pvc[0] > 0) {
        topClickable = true;
        topElement = document.getElementById(`minimap-node-${pvc[0] - 1}-${pvc[1]}`);
    }

    if (pvc[0] < 4) {
        bottomClickable = true;
        bottomElement = document.getElementById(`minimap-node-${pvc[0] + 1}-${pvc[1]}`);
    }


    if (leftClickable && !leftElement.classList.contains('empty-node')) {
        _clickables.push(leftElement);
    }

    if (rightClickable && !rightElement.classList.contains('empty-node')) {
        _clickables.push(rightElement);
    }

    if (topClickable && !topElement.classList.contains('empty-node')) {
        _clickables.push(topElement);
    }

    if (bottomClickable && !bottomElement.classList.contains('empty-node')) {
        _clickables.push(bottomElement);
    }


    if (_player.vars.canTravelOnMinimap) {
        makeClickable(_clickables);
        colorElements(leftElement, rightElement, topElement, bottomElement);
    } else {
        for (let i = 0; i < _clickables.length; i++) { //clean up all the listeners
            removeClickListener(_clickables[i]);
        }
    }
}

function colorElements(left, right, top, bottom) {
    'use strict';
    if (left != undefined) {
        left.style.color = 'blue';
    }

    if (right != undefined) {
        right.style.color = 'blue';
    }

    if (top != undefined) {
        top.style.color = 'blue';
    }

    if (bottom != undefined) {
        bottom.style.color = 'blue';
    }

}

function makeClickable(clickables) {
    'use strict';
    clickables.forEach(element => {
        addClickListener(element);
    });
}

function addClickListener(e) {
    'use strict';
    e.addEventListener('click', moveCharTo, false);
}

function removeClickListener(e) {
    'use strict';
    e.removeEventListener('click', moveCharTo, false);
    e.style.color = 'black';
}

function getLocationByCoords(x, y) {
    'use strict';
    let loc = _player.vars.currentMap.nodes[x][y];
    if (['h-road', 'v-road', 'cross-road'].indexOf(loc) !== -1) {
        return road;
    } else if (loc != 'none') {
        return loc;
    } else {
        return 'none';
    }
}

function moveCharTo(event) {
    'use strict';

    let oldLocationCoords = _player.vars.coords;
    let oldLocationObject = getLocationByCoords(oldLocationCoords[0], oldLocationCoords[1]);
    let oldElement = document.getElementById(`minimap-node-${oldLocationCoords[0]}-${oldLocationCoords[1]}`);

    oldElement.classList = 'minimap-node';
    
    oldLocationObject.icon.forEach((ico) => { 
        oldElement.classList.add(ico);
    });

    let str = event.target.id;
    let x = parseInt(str.charAt(13));
    let y = parseInt(str.charAt(15));

    let newLocationCoords = [x, y];
    let newLocationObject = getLocationByCoords(x, y);

    let newElement = document.getElementById(`minimap-node-${newLocationCoords[0]}-${newLocationCoords[1]}`);
    newElement.classList.add('fas');
    newElement.classList.add('fa-user');

    _player.vars.currentLocation = newLocationObject;
    _player.vars.coords = newLocationCoords;


    updateLocationBasedElems(newLocationObject);
    loadLocation(newLocationObject);
    flagClickables();
}