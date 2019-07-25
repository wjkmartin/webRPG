export function saveActor(actor) {
    'use strict'; //eventually add obfuscations
    let name = actor.vars.actorName; 
    var date = new Date();
    date.setTime(date.getTime() + (999 * 24 * 60 * 60 * 1000));
    let expires = "; expires=" + date.toUTCString();
    document.cookie = name + '=' + JSON.stringify(actor.vars) + expires + "; path=/";
}