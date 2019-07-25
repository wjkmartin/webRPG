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
    basic_circlet: {
        name: 'Scratched Circlet of Brass',
        icon: 'fa-hat-wizard',
        itemRef: Math.floor(Math.random() * (Math.random()) * 14567676665785443),
        rarity: 1,
        type: 'Head',
        damageDesc: 'Adds 1 armor.',
        desc: 'A damaged circlet made of common brass. The magical runes are damaged, rendering it wholly mundane.',
        slot: 'head',
        armor: 1,
        stat: 'armor',
        value: 20,
    },
    head_splarth: {
        name: 'Head of Splarth',
        icon: 'fa-helmet-battle',
        itemRef: Math.floor(Math.random() * (Math.random()) * 14567676665785443),
        rarity: 6,
        type: 'Helm',
        damageDesc: 'Adds 5 armor',
        desc: 'This is made from Splarth\'s actual skull. Gross.',
        slot: 'head',
        armor: 5,
        stat: 'armor',
        value: 200,

    },
};