export default 
{
    abilityName: 'firebolt',
    prettyName: 'Firebolt',
    icon: '../img/firebolt.png',
    damage: function(actor) {
        'use strict';
        return actor.vars. Math.floor(actor.vars.intelligence * Math.random() * 1.25);
    },
    isMagical: true,
    tooltip: 'Shoot a small blast of magical flame.'
};