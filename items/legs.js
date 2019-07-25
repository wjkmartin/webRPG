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
    basic_pants: {
        name: 'Linen Pants',
        icon: 'fa-socks',
        itemRef: Math.floor(Math.random() * (Math.random()) * 14567676665785443),
        rarity: 1,
        type: 'Head',
        damageDesc: 'Adds 1 armor.',
        desc: 'Pants of a straightforward construction. Try not to soil them.',
        slot: 'legs',
        armor: 1,
        stat: 'armor',
        value: 20,
    },
};