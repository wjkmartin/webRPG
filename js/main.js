import { Player } from "./Player.js";
import playerData from '../chars/player.js';

import { initWorldChars } from "./locationManager.js";
import { initMinimap } from './minimapv2.js';

import { startPrologue } from './event.js';

document.addEventListener("DOMContentLoaded", function() {
	'use strict';
	init();
  });

function init() {
	'use strict';

	let player = new Player(playerData);
	
	initMinimap(player);
	initWorldChars(player);

	startPrologue(player);
	
}




