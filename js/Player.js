import basicAttack from '../abilities/basicAttack.js';
import firebolt from '../abilities/firebolt.js';

import {
    Actor
} from "./Actor.js";
import {
    updatePlayerUI,
    updateEquipment,
    updateInventoryGrid,
    updateExp,
    updateQuestUI,
    updateHotbar
} from "./UI.mjs";

import {
    Combat
} from './Combat.js';
import {
    createListeners
} from './stateManager.js';
import {
    writeActivityLog
} from './activityLog.js';
import {
    Inventory
} from './inventory.js';

import { Item } from "./item.js";
import weapons from '../items/weapons.js';
import heads from '../items/heads.js';
import chests from '../items/chests.js';
import legs from '../items/legs.js';
import feet from '../items/feet.js';

import { startQuest, updateQuestStage } from './quests.js';

export class Player extends Actor {
    constructor(data) {
        super(data);
        this.boundHotbarClick = this.hotbarClick.bind(this);
        this.combat = '';

        this.hotBarAbilities = {
            hb0: basicAttack,
            hb1: firebolt
        };

        this.inventory = new Inventory(this);

        this.boundEquipItem = this.equipItem.bind(this);
        this.boundUnequipItem = this.unequipItem.bind(this);

        this.boundDropItem = this.dropItem.bind(this);

        this.updateStats();

        updateHotbar(this, this.hotBarAbilities);
        updatePlayerUI(this);
        createListeners();

        let basicCirclet = new Item(heads.basic_circlet);
        this.addItemToInventory(basicCirclet);
        this.inventory.equipItem(basicCirclet);

        let basicStaff = new Item(weapons.oak_stave);
        this.addItemToInventory(basicStaff);
        this.inventory.equipItem(basicStaff);

        let basicRobe = new Item(chests.basic_robes);
        this.addItemToInventory(basicRobe);
        this.inventory.equipItem(basicRobe);

        let basicPants = new Item(legs.basic_pants);
        this.addItemToInventory(basicPants);
        this.inventory.equipItem(basicPants);

        let basicBoots = new Item(feet.basic_boots);
        this.addItemToInventory(basicBoots);
        this.inventory.equipItem(basicBoots);

        startQuest('test_quest1');
        startQuest('test_quest2');

        updateQuestStage('test_quest1', 2);
        updateQuestStage('test_quest2', 1);

    }

    updateStats() {
        this.vars.dodge = Math.floor(this.vars.dexterity * 0.7);
        this.vars.focus = Math.floor(this.vars.intelligence * 2.5);
        this.vars.armor = this.vars.armorFromEquipment + Math.floor(this.vars.dexterity * 0.5);
        updatePlayerUI(this);
    }


    hotbarClick(event) {
        if (this.vars.inCombat) {
            this.combat.playerAction(this.hotBarAbilities[event.target.id.slice(14, 17)]);
        } else writeActivityLog('You are not in combat.');
    }

    startCombat(enemy) {
        this.vars.inCombat = true;
        let combat = new Combat(this, enemy);
        this.combat = combat;
    }

    equipItem(event) {
        let item = this.inventory.getItemByRef(event.target.itemRef);
        this.inventory.equipItem(item);
        this.updateStats();
    }

    unequipItem(event) {
        let item = this.inventory.equipedItems[event.target.slotRef];
        this.inventory.unequipItem(item);
        updateEquipment(this);
        updateInventoryGrid(this.inventory.items, this);
        this.updateStats();
    }

    dropItem(event) {
        this.inventory.removeItemByRef(event.target.itemRef)
    }

    addExp(_exp) {
        writeActivityLog('You gained ' + _exp + ' EXP');
        _exp == undefined ? _exp = 0: '';
        this.vars.exp += _exp;    
        if (this.vars.exp >= this.vars.expToLevel) {
            this.vars.exp = 0;
            this.levelUp();
        } else {
            updatePlayerUI(this);
        }
    }

    levelUp() {
        writeActivityLog('Congratulations, you have gained a level!');
        this.vars.level += 1;
        this.vars.expToLevel = Math.floor(this.vars.expToLevel * 1.2);

        this.vars.maxHealth += this.vars.constitution;
        this.vars.maxStamina += this.vars.constitution;
        
        updatePlayerUI(this);
    }

    addItemToInventory(item) {
        writeActivityLog('Item added to inventory: ' + item.name);
        this.inventory.items.push(item);
        updateInventoryGrid(this.inventory.items, this);
    }

}