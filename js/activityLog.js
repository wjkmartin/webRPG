export function writeActivityLog(str, type, style) {
    'use strict';
    let logText = '';
    let elem = document.querySelector('#activity-log');
    let entry = document.createElement('div');

    logText = "[ " + str + " ]";
    entry.innerHTML = logText;

    elem.appendChild(entry);
}