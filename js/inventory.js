import {
    Item
} from "./item.js";
import {
    updateInventoryGrid,
    updateEquipment,
    updatePlayerUI
} from './UI.mjs';
import {
    converseWith
} from "./conversation.js";

export class Inventory {
    constructor(player) {
        this.items = [];
        this.player = player;

        this.equipedItems = {
            head: '',
            chest: '',
            legs: '',
            feet: '',
            rightHand: '',
            leftHand: '',
            accessory: '',
        };

        this.calcArmor();

        updateInventoryGrid(this.items, this.player);
    }

    itemInInventoryByRef(itemRef) {
        for (let i = 0; i < this.items.length; i++) {
            const e = this.items[i];
            if (e.itemRef == itemRef) {
                return true;
            } 
        }
        return false;
    }

    getItemByRef(ref) {
        return this.items.find((i) => {
            return i.itemRef == ref;
        });
    }

    removeItemByRef(ref) {
        this.items = this.items.filter((i) => {
            return i.itemRef != ref;
        });
        updateInventoryGrid(this.items, this.player);
    }

    addItemToInventoryByRef(ref) {
        let item = Item.getItemByRef(ref);
        this.items.push(item);
        updateInventoryGrid(this.items, this.player);
    }

    swapItemsByRef(ref1, ref2) {
        let index1 = this.items.map((e) => {
            return e.itemRef;
        }).indexOf(ref1);

        let index2 = this.items.map((e) => {
            return e.itemRef;
        }).indexOf(ref2);

        let foo = this.items[index1];
        this.items[index1] = this.items[index2];
        this.items[index2] = foo;
    }

    equipItem(item) {

        let slot = item.slot;

        this.equipedItems[slot] = item;

        this.removeItemByRef(item.itemRef);
        this.calcArmor();
        this.calcAttack();
        updateEquipment(this.player);
        updatePlayerUI(this.player);
    }

    calcArmor() {
        let armor = 0;
        Object.keys(this.equipedItems).forEach((item) => {
            if (this.equipedItems[item].stat === 'armor') {
                armor += this.equipedItems[item].armor;
            }
        });
        this.player.vars.armorFromEquipment = armor;
    }

    calcAttack() {
        let attack = 0;
        Object.keys(this.equipedItems).forEach((item) => {
            if (this.equipedItems[item].stat === 'attack') { 
                attack += this.equipedItems[item].attack;
            }
        });
        this.player.vars.attackFromEquipment = attack;
    }

    unequipItem(item) {
        let slot = item.slot;
        this.equipedItems[slot] = '';
        this.items.push(item);
        this.calcArmor();
        updatePlayerUI(this.player);
    }
}