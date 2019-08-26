export default 
{
    abilityName: 'basicAttack',
    prettyName: 'Basic Attack',
    prettyDesc: function() {
        'use strict';
        let list = [
            ' makes a brutal attack towards the vital organs of ',
            ' steps forward and snarls, making a swing towards ',
            ' nearly knocks themself off balance with the force of the blow towards '
        ];
        return list[Math.floor(Math.random()*list.length)];
    },
    icon: '/img/basic-attack.png',
    damage: function(actor) {
        'use strict';
        return Math.floor(actor.vars.strength * Math.random()) + actor.vars.attackFromEquipment;
    },
    isMagical: false,
    tooltip: 'Attack with your weapon.'

};