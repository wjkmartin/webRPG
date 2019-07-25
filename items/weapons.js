export default 
{
    TEMPLATE: {
        name: '', //Should be pretty
        icon: '', //FA classname 
        itemRef: Math.floor(Math.random() * (Math.random()) * 14567676665785443), //don't touch
        rarity: 1, // [1-6] Common, Uncommon, Rare, Very Rare, Legendary, Artifact
        type: '', // type of weapon or armor e.g. "Magical Sword"
        damageDesc: '', //decription of special dmg effects
        desc: '', //pretty flavor text.
        slot: '' //head, chest, legs, feet, rightHand, leftHand, accessory
    },
    oak_stave: {
        name: 'Oak Stave',
        icon: 'fa-staff',
        itemRef: Math.floor(Math.random() * (Math.random()) * 14567676665785443),
        rarity: 1,
        type: 'Non-Magical Rod',
        damageDesc: 'Deals an extra 2 damage per hit',
        desc: 'A simple weapon. Strong and sturdy. No man turns down a stout wooden staff, when the alternative is an empty hand to face the sharp steel of a bandit.',
        slot: 'rightHand',
        attack: 2,
        stat: 'attack',
        value: 20,
    },
    sword_splarth: {
        name: 'Sword Of Splarth',
        icon: 'fa-sword',
        itemRef: Math.floor(Math.random() * (Math.random()) * 14567676665785443),
        rarity: 6,
        type: 'Magical Sword',
        damageDesc: 'Deals an extra 99 damage per hit',
        desc: 'When Splarth is drawn, all shall despair.',
        slot: 'rightHand',
        attack: 99,
        stat: 'attack',
        value: 1000,
    },
};