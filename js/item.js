export class Item {
    constructor(item) {
        this.name = item.name;
        this.icon = item.icon;
        this.itemRef =  Math.floor(Math.random() * (Math.random()) * 1456767665443);
        this.rarity = item.rarity;
        this.type = item.type;
        this.desc = item.desc;
        item.damageDesc != undefined ? (this.damageDesc = item.damageDesc): '';
        item.slot != undefined ? (this.slot = item.slot): '';
        item.armor != undefined ? (this.armor = item.armor): '';
        item.stat != undefined ? (this.stat = item.stat): '';
        item.attack != undefined ? (this.attack = item.attack): '';
        item.value != undefined ? (this.value = item.value): '';
        Item.masterList.push(this);
    }
    static getItemByRef(ref) {
        return Item.masterList.find((i) => {
            return i.itemRef == ref;
        });
    }
}
Item.masterList = [];