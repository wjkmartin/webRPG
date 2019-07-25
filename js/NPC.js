import {
    Actor
} from "./Actor.js";
import {
    updateActorUI
} from "./UI.mjs";
import {
    writeActivityLog
} from "./activityLog.js";
import { converseWith } from "./conversation.js";

import { beginTrade } from "./trade.js";

import bandit from '../chars/randoms/bandit.js';

export class NPC extends Actor {
    constructor(data) {
        super(data);
    
        updateActorUI(this);
    }

    requestDuel(player) {
        if (player.vars.inCombat) {
            writeActivityLog('You are already in combat!');
        } else if (!this.vars.isDead) {
            writeActivityLog('You request a duel with ' + this.vars.actorName);
            setTimeout(this.acceptDuelRequest.bind(this, player), 1200); //this!!!
        } else {
            writeActivityLog('You cannot request a duel with a dead person.');
        }
    }

    acceptDuelRequest(player) {
        writeActivityLog(this.vars.actorName + ' accepts your duel request.');
        player.startCombat(this);
    }

    talkTo(player) {
        converseWith(this, player);
    }

    trade(player) {
        beginTrade(this, player);
    }

    addFriend() {
        console.log('request friend');
    }

    useAbility(ability, player) {
        writeActivityLog(this.vars.actorName + ability.prettyDesc() + player.vars.actorName);
        player.takeDamage(ability.damage(this), ability.isMagical, ability.prettyName.toLowerCase());
    }

    levelUp() {
        this.vars.level += 1;
        this.vars.dexterity += 1;
        if (this.vars.class == 'bandit') {
            if ((this.vars.level % 2) == 0) {
                this.vars.strength += 1;
                this.vars.constitution += 1;
            } 
        } 

        this.vars.maxHealth += this.vars.constitution;
        this.vars.maxStamina += this.vars.constitution;
        this.vars.maxMana += this.vars.intelligence;

        this.vars.health = this.vars.maxHealth;
        this.vars.stamina = this.vars.maxStamina;
        this.vars.maxMana = this.vars.mana; 

        this.vars.expVal = 10 * this.vars.level;

        this.vars.dodge = Math.floor(this.vars.dexterity * 0.7);
        this.vars.focus = Math.floor(this.vars.dexterity * 2.5);
        this.vars.armor = this.vars.armorFromEquipment + Math.floor(this.vars.dexterity * 0.33);


        //TO DO: GENERATED STATS- FOCUS, DODGE, ARMOR BASED ON ABILITY SCORES

        
    }

    static getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
      }

    static generateRandomNpcOfType(type) { //the type is a string
        'use strict';
        let enemy;
        switch(type) {
            case 'bandit':
                enemy = new NPC(bandit); 
                break;                         
        }
        let e = enemy.vars; 
        e.actorName = e.actorName[Math.floor(Math.random()*e.actorName.length)];
        let level = NPC.getRandomIntInclusive(e.level[0], e.level[1]);

        for (let i = 0; i < level; i++) {
            enemy.levelUp();
        }
        e.level = level;
        e.raceLevelClassString = `${e.race} Level ${e.level} ${e.actorClass}`;
        return enemy;
    }
}

NPC.listenersMade = false;