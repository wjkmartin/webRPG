import {
	writeActivityLog
} from "./activityLog.js";



export class Actor {
	constructor(data) {
		'use strict';
		this.varsBase = data;
		this.varsBase.raceLevelClassString = `${this.varsBase.race} Level ${this.varsBase.level} ${this.varsBase.actorClass}`;

		this.vars = this.varsBase;
		this.boundUpdate = this.update.bind(this);
		this.vars.isDead = false;
	}

	setValue(key, val) {
		this.vars[key] = val;
		this.saveAllToCookie(this.update);
	}

	replacer(key, value) {
		if (typeof value === 'function') {
			return value.toString(); //working
		}
		else {
			return value;
		}
	}

	reviver(key, value) {
		if (key === 'onclick') {
			let str = "var func = " + value;
			eval(str);
			return func;
		} else {
			return value;
		}
	}

	saveAllToCookie(cb) {
		var date = new Date();
		date.setTime(date.getTime() + (999 * 24 * 60 * 60 * 1000));
		let expires = "; expires=" + date.toUTCString();

		document.cookie = this.vars.actorName + '=' + JSON.stringify(this.vars, this.replacer) + expires + "; path=/";
		cb();
	}

	update() {	
		this.vars = JSON.parse(this.getCookie(), this.reviver);
	}

	getCookie() {
		return this.readCookie(this.vars.actorName);
	}

	readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	takeDamage(dmg, isMagical, abilityName) {
		let takenDmg = dmg;
		let dodgeNum = Math.random() * 100;
		if (dodgeNum < this.vars.dodge) {
			takenDmg = 0;
			writeActivityLog(this.vars.actorName + ' dodged the attack!'); //add a bunch more strings
		} else if (!isMagical) {
			takenDmg -= this.vars.armor;
			if (takenDmg <= 0) {
				writeActivityLog('but ' + this.vars.actorName + ' neatly blocks the attack!') //add a bunch more strings
			}
		}

		if (takenDmg < 0) {
			takenDmg = 0;
		} else if (this.vars.health - takenDmg <= 0) {
			this.vars.health = 0;
			takenDmg = 0;
			this.vars.isDead = true;
			writeActivityLog(this.vars.actorName + " is now dead.");
		}

		this.vars.health -= Math.floor(takenDmg);

		if (!this.vars.isDead && (takenDmg > 0)) {
			
			writeActivityLog(this.vars.actorName + ' takes ' + takenDmg + ' from a ' + abilityName);
		}
	}
}