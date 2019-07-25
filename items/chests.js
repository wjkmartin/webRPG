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
    basic_robes: {
        name: 'Simple Linen Robes',
        icon: 'fa-tshirt',
        itemRef: Math.floor(Math.random() * (Math.random()) * 14567676665785443),
        rarity: 1,
        type: 'Robes',
        damageDesc: 'Adds 1 armor.',
        desc: 'Simple robes that protect the modesty of the wearer, and keep them comfortably warm.',
        slot: 'chest',
        armor: 1,
        stat: 'armor',
        value: 20,
    },
};