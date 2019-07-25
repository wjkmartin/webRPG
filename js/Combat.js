import {
    updatePlayerUI,
    updateActorUI,
} from "./UI.mjs";

import {
    writeActivityLog
} from "./activityLog.js";

import {
    loadLocation,
    setMinimapTravel
} from './locationManager.js';

import {
    changeDesc,
    changeButtons
} from './mainDisplay.js';

import {
    continuePrologue
} from './event.js';

import basicAttack from '../abilities/basicAttack.js';

export class Combat {
    constructor(player, enemy) {
        this.enemy = enemy;
        this.player = player;
        this.combatRunning = true;
        this.turn = 0;
        this.playerTurn = true;
        this.addedExp = false;
        this.boundEnemyTurn = this.enemyTurn.bind(this);
        this.boundRunAway = this.runAway.bind(this);

        let butt = document.createElement('button');
        butt.classList.add('runaway-button');
        butt.innerHTML = 'Run Away';
        butt.addEventListener('click', this.boundRunAway, false);
        changeButtons([butt]);
        setMinimapTravel(false);
        writeActivityLog('You are now in combat with ' + enemy.vars.actorName + "!");
        changeDesc('You are fighting ' + this.enemy.vars.actorName);
    }

    runAway() {
        if (this.playerTurn == true) {
            writeActivityLog('Brave ' + this.player.vars.actorName + ' ran away!');
            if (this.combatRunning == true) {
                this.combatRunning = false;
                this.player.vars.inCombat = false;
                writeActivityLog('Combat has ended.');
                loadLocation(this.player.vars.currentLocation);
            }
        } else {
            writeActivityLog('You can only run away on your turn!');
        }

    }

    enemyTurn() {
        if (this.enemy.vars.isDead || this.player.vars.isDead) {
            this.combatRunning = false;
            this.endCombat();
        } else {
            this.enemy.useAbility(basicAttack, this.player);
            updatePlayerUI(this.player);
            updateActorUI(this.enemy);
            this.nextTurn();
        }

    }

    playerEndTurn() {

        updateActorUI(this.enemy);

        if (this.enemy.vars.isDead || this.player.vars.isDead) {
            this.endCombat();
        } else {
            setTimeout(this.boundEnemyTurn, 1000);
        }
    }

    playerAction(ability) {
        if (this.playerTurn) {
            this.playerTurn = false;
            let dmg = ability.damage(this.player);
            this.enemy.takeDamage(dmg, ability.isMagical, ability.abilityName);
            this.enemy.vars.isDead ? this.endCombat() : this.playerEndTurn();
            updatePlayerUI(this.player);
            updateActorUI(this.enemy);
        } else {}
    }

    nextTurn() {
        if (this.enemy.vars.isDead || this.player.vars.isDead) {
            this.endCombat();
        } else {
            this.playerTurn = true;
            this.turn += 1;
        }
    }

    endCombat() {
        if (this.combatRunning == true) {
            this.combatRunning = false;
            if (this.enemy.vars.isDead) {
                updateActorUI(this.enemy);
                this.player.addExp(this.enemy.vars.expVal);
            }
            this.player.vars.inCombat = false;
            writeActivityLog('Combat has ended.');
            loadLocation(this.player.vars.currentLocation);
            if (this.player.vars.inPrologueEvent) {
                continuePrologue(this.player);
            }
        }
    }

}