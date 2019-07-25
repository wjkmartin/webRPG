import {
	prepActorByLink,
	clickItemInv,
	clickItemEquip
} from './stateManager.js';

import {
	getQuestData
} from './quests.js';
import {
	getActorItemsForTrade,
	getPlayerItemsForTrade,
	addItemToTradeWindow,
	addItemToInventoryFromTrade,
	selectTradeSlot,
	unselectTradeSlot,
	clickCompleteTrade
} from './trade.js';


let _player;
let activeActor;
let item1 = 'wew';
let item2;

let tradeWindowVisible = false;

export function updatePlayerUI(player) {
	'use strict';
	document.querySelector('.inventory-detail').style.visibility = 'hidden';

	let updateList = Object.keys(player.vars);

	for (let i = 0; i < updateList.length; i++) {
		let element = document.querySelector(`#player-${updateList[i]}`);
		if (element !== null) {
			element.innerHTML = player.vars[updateList[i]];
		}
	}

	updateBarWidths(player.vars);
	updateExp(player);
}

export function updateActorUI(actor) {
	'use strict';
	activeActor = actor;
	let updateList;
	let card = document.getElementsByClassName('thing-card--NPC')[0];

	if (actor == '') {
		card.style.visibility = 'hidden';
	} else {
		card.style.visibility = 'visible';
		updateList = Object.keys(actor.vars);
		for (let i = 0; i < updateList.length; i++) {
			let element = document.querySelector(`#actor-${updateList[i]}`);
			if (element !== null) {
				element.innerHTML = actor.vars[updateList[i]];
			}
		}

		updateBarWidths(actor.vars);
	}
}

export function updateInventoryGrid(items, player) {
	'use strict';

	document.querySelector('.inventory-detail').style.visibility = 'hidden';
	document.querySelector('.equipment-detail').style.visibility = 'hidden';

	_player = player;

	for (let i = 0; i < 18; i++) {
		let row = Math.floor(i / 6);
		let col = Math.floor(i % 6);
		let e = document.querySelector(`#inventory-node-${row}-${col}`);
		while (e.firstChild) {
			e.removeChild(e.firstChild);
		}
		if (items[i] != undefined) {
			let item = document.createElement('div');
			item.itemRef = items[i].itemRef;
			item.classList.add('fas');
			item.classList.add(items[i].icon);
			item.classList.add('inv-item');
			e.appendChild(item);
			item.addEventListener("click", clickItemInv, false);
			item.draggable = true;

			item.addEventListener('dragstart', (evt) => {
				evt.dataTransfer.setData("text/plain", evt.target.itemRef);
				item1 = evt.target.itemRef;
			}, false);

			item.addEventListener("dragenter", (evt) => {
				evt.preventDefault();
			}, false);

			item.addEventListener("dragover", (evt) => {
				evt.preventDefault();
			}, false);

			if (tradeWindowVisible) {
				item.addEventListener('drag', (evt) => {
					evt.preventDefault();
					let tradeWindowOverlay = document.querySelector('.trade-window--onhover-overlay');
					tradeWindowOverlay.style.display = 'initial';
				}, false);

				item.addEventListener('dragleave', (evt) => {
					evt.preventDefault();
				}, false);

				item.addEventListener("dragend", (evt) => {
					evt.preventDefault();
					
					let tradeWindowOverlay = document.querySelector('.trade-window--onhover-overlay');
					tradeWindowOverlay.style.display = 'none';
				}, false);

				item.addEventListener('drop', (evt) => {
					evt.preventDefault();
					let data = evt.dataTransfer.getData("text");
					addItemToInventoryFromTrade(data, _player);
					let clonedItem = item.cloneNode(true);
					item.parentNode.replaceChild(clonedItem, item);
					evt.dataTransfer.clearData();
				}, false);
			} else {
				item.addEventListener('drop', function drop(evt) {
					evt.preventDefault();
					item2 = evt.target.itemRef;
					player.inventory.swapItemsByRef(item1, item2);
					updateInventoryGrid(items, player);
				}, false);
			}
		} else {
			//nuttin
		}
	}
}

export function updateEquipment(player) {
	'use strict';
	let equipment = player.inventory.equipedItems;
	let keys = Object.keys(equipment);

	for (let i = 0; i < 7; i++) {
		let item = equipment[keys[i]];
		let slot = document.querySelector(`#${keys[i]}Slot`);
		if (equipment[keys[i]] != '') {
			slot.classList.add('equipment-icon');
			slot.classList.add('fas');
			slot.classList.add(item.icon);
			slot.thisSlot = item.slot;
			slot.addEventListener("click", clickItemEquip, false);
		} else {
			slot.className = '';
			slot.classList.add('equip-box');
		}
	}
}

export function focusOnItem(itemRef, renderScreen) {
	'use strict';
	document.querySelector(`.${renderScreen}-detail`).style.visibility = 'visible';
	let item;
	if (renderScreen == 'inventory') {
		item = _player.inventory.getItemByRef(itemRef);
	} else {
		item = _player.inventory.equipedItems[itemRef];
	}

	let itemTitle = document.querySelector(`.${renderScreen}-detail--title-bar-name`);
	itemTitle.innerHTML = item.name;
	let itemRarity = document.querySelector(`.${renderScreen}-detail--title-bar-rarity`);
	switch (item.rarity) {
		case 1:
			itemRarity.innerHTML = 'Common';
			break;
		case 2:
			itemRarity.innerHTML = 'Uncommon';
			break;
		case 3:
			itemRarity.innerHTML = 'Rare';
			break;
		case 4:
			itemRarity.innerHTML = 'Very Rare';
			break;
		case 5:
			itemRarity.innerHTML = 'Legendary';
			break;
		case 6:
			itemRarity.innerHTML = 'Artifact';
			break;
	}
	let itemType = document.querySelector(`.${renderScreen}-detail--body-type`);
	itemType.innerHTML = item.type;

	let itemDamage = document.querySelector(`.${renderScreen}-detail--body-damage`);
	itemDamage.innerHTML = item.damageDesc;

	let itemDescription = document.querySelector(`.${renderScreen}-detail--body-description`);
	itemDescription.innerHTML = "\"" + item.desc + "\"";

	switch (renderScreen) {
		case 'inventory':
			let equipButton = document.querySelector(`.inventory-detail--body-equip`);
			equipButton.itemRef = itemRef;
			equipButton.addEventListener('click', _player.boundEquipItem, false);

			let dropButton = document.querySelector(`.inventory-detail--body-drop`);
			dropButton.itemRef = itemRef;
			dropButton.addEventListener('click', _player.boundDropItem, false);
		case 'equipment':
			let unequipButton = document.querySelector(`.equipment-detail--body-unequip`);
			unequipButton.slotRef = item.slot;
			unequipButton.addEventListener('click', _player.boundUnequipItem, false);

	}

}

export function updateMainDescription(str) {
	'use strict';
	document.querySelector('.middle-column--row-middle').innerHTML = str;
}

function updateBarWidths(actor) {
	'use strict';
	let hP = (actor.health / actor.maxHealth) * 100;
	let mP = (actor.mana / actor.maxMana) * 100;

	hP = Math.floor(hP);
	mP = Math.floor(mP);

	if (actor.isPlayer == true) {
		document.querySelector(`#player-healthBar`).style.width = `${hP}px`;
		document.querySelector('#player-manaBar').style.width = `${mP}px`;

		let spContainer = document.querySelector(`#spContainer`);

		while (spContainer.firstChild) {
			spContainer.removeChild(spContainer.firstChild);
		}

		let SPpoints = actor.sp;

		for (let i = 0; i < actor.maxSP; i++) {
			let spPointBG = document.createElement('div').cloneNode(true);
			spPointBG.classList.add('player-SP');
			if (SPpoints > 0) {
				spPointBG.setAttribute("style", "background-image: radial-gradient(#387989, #6dd5ed);");
				SPpoints -= 1;
			}
			spContainer.appendChild(spPointBG, );

		}
	} else {
		document.querySelector(`#actor-healthBar`).style.width = `${hP}px`;
		document.querySelector('#actor-manaBar').style.width = `${mP}px`;
	}
}

export function updateActiveCharList(chars) {
	'use strict';
	let e = document.querySelector('#active-characters');

	while (e.firstChild) {
		e.removeChild(e.firstChild);
	}

	for (var i = 0; i < chars.length; i++) {
		let elem = document.createElement('a');
		elem.href = '#';
		elem.className = 'active-characters-list--item';

		elem.innerHTML = chars[i];
		e.append(elem);
		prepActorByLink(elem);
	}
}

export function updateLocationBasedElems(locOb) {
	'use strict';
	document.getElementById('place-time-indicator--place').innerHTML = locOb.prettyName;
}

export function updateExp(player) {
	'use strict';

	player = player.vars;
	let exp = player.exp;
	let expToLevel = player.expToLevel;

	let expRatio = Math.floor((exp / expToLevel) * 100);
	expRatio = expRatio.toString() + '%';
	let bar = document.querySelector('#exp-bar');
	bar.style.width = expRatio;

}

export function updateQuestUI() {
	'use strict';
	let quests = getQuestData();
	let questContainer = document.querySelector('#quests');

	while (questContainer.firstChild) {
		questContainer.removeChild(questContainer.firstChild);
	}

	for (let i = 0; i < quests.length; i++) {
		let thisQuest = quests[i];

		let quest = document.createElement('div');
		quest.classList.add('quest');

		let questTitle = document.createElement('div');
		questTitle.classList.add('quest-title');
		questTitle.innerHTML = thisQuest.title;
		quest.appendChild(questTitle);

		let questBody = document.createElement('div');
		questBody.classList.add('quest-body');
		questBody.innerHTML = thisQuest.textBody;
		quest.appendChild(questBody);

		let questStageContainer = document.createElement('div');
		questStageContainer.classList.add('quest-stage-container');

		for (let n = 0; n < quests[i].stages; n++) {
			let questStage = document.createElement('div');
			questStage.classList.add('quest-stage');

			let currentStage = thisQuest.stage;
			if (currentStage > n) {
				questStage.classList.add('complete');
			}

			questStage.innerHTML = thisQuest[`obj${n}`];
			questStageContainer.appendChild(questStage);
		}

		quest.appendChild(questStageContainer);
		questContainer.appendChild(quest);
		questContainer.style.maxheight = 150 * quests.length;
		questContainer.scrollTop = 0;
	}

}

export function updateHotbar(player, hotBarAbilities) {
	'use strict';

	let hotBarNumberOfItems = Object.keys(hotBarAbilities).length;
	let hotBarElems = [];

	for (let i = 0; i < hotBarNumberOfItems; i++) {
		let e = document.createElement('a');
		e.className = 'player-hotbar-item';
		hotBarElems.push(e);
	}

	let hotbar = document.querySelector('#hotbar');

	while (hotbar.firstChild) {
		hotbar.removeChild(hotbar.firstChild);
	}

	for (var i = 0; i < 18; i++) {
		if (hotBarElems[i] != undefined) {
			let e = hotBarElems[i];
			let eIcon = document.createElement('img');
			eIcon.className = 'hotbar-icon';
			eIcon.src = hotBarAbilities[`hb${i}`].icon;
			eIcon.id = `player-hotbar-hb${i}`;

			eIcon.setAttribute('data-toggle', 'tooltip');
			eIcon.setAttribute('data-html', 'true');
			eIcon.setAttribute('title',
				`<u>${hotBarAbilities[`hb${i}`].prettyName}\n</u>
		<p>\n</p>
		 <em>\n\n${hotBarAbilities[`hb${i}`].tooltip}</em> `
			);

			e.appendChild(eIcon);
			hotbar.appendChild(e);
			e.addEventListener("click", player.boundHotbarClick, false);
		} else {
			let e = document.createElement('div');
			e.classList.add('empty-hotbar-item');
			hotbar.appendChild(e);
		}
	}

	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});
}

export function showTradeWindow(actorItems) {
	'use strict';
	tradeWindowVisible = true;
	updateInventoryGrid(_player.inventory.items, _player);

	let tradeWindow = document.querySelector('.trade-window');
	tradeWindow.style.visibility = 'visible';

	updateTradeSlots();

	tradeWindow.addEventListener('dragover', function drop(evt) {
		evt.preventDefault();
	}, false);

	tradeWindow.addEventListener('dragenter', function drop(evt) {
		evt.preventDefault();
	}, false);

	tradeWindow.addEventListener('dragleave', function drop(evt) {
		evt.preventDefault();
	}, false);

	tradeWindow.addEventListener('drop', function drop(evt) {
		evt.preventDefault();
		let data = evt.dataTransfer.getData("text");
		addItemToTradeWindow(data, _player);
		evt.dataTransfer.clearData();
	}, false);

	let completeTradeButton = document.querySelector('#complete-trade');
	completeTradeButton.addEventListener('click', clickCompleteTrade, false);
}

export function hideTradeWindow() {
	'use strict';
	let tradeWindow = document.querySelector('.trade-window');

	let completeTradeButton = document.querySelector('#complete-trade');
	completeTradeButton.removeEventListener('click', clickCompleteTrade, false);
	tradeWindow.style.visibility = 'hidden';
	tradeWindowVisible = false;

}

export function updateTradeSlots(removedItem) {
	'use strict';

	let actorItems = getActorItemsForTrade();
	let playerItems = getPlayerItemsForTrade();
	let actorTradeSlotsElem = document.querySelector('#actorTradeSlots');

	while (actorTradeSlotsElem.firstChild) {
		actorTradeSlotsElem.removeChild(actorTradeSlotsElem.firstChild);
	}

	for (let i = 0; i < actorItems.length; i++) {
		let item = document.createElement('div').cloneNode(true);
		item.itemRef = actorItems[i].itemRef;
		item.classList.add('fas');
		item.classList.add(actorItems[i].icon);
		item.classList.add('inv-item');
		item.classList.add('trade-window--node');
		item.index = i;
		item.id = `actor-trade-slot-${i}`;
		item.addEventListener('click', selectTradeSlotActor, false);
		actorTradeSlotsElem.appendChild(item);
		
	}

	let playerTradeSlotsElem = document.querySelector('#playerTradeSlots');
	let dragToTradeElem = document.querySelector('.trade-window--grids-drag-here');

	while (playerTradeSlotsElem.firstChild) {
		playerTradeSlotsElem.removeChild(playerTradeSlotsElem.firstChild);
	}

	if (playerItems.length == 0) {
		dragToTradeElem.style.display = '';
	} else {
		// dragToTradeElem.style.display = 'none';
		for (let i = 0; i < playerItems.length; i++) {
			let item = document.createElement('div').cloneNode(true);
			item.itemRef = playerItems[i].itemRef;
			item.classList.add('fas');
			item.classList.add(playerItems[i].icon);
			item.classList.add('inv-item');
			item.classList.add('trade-window--node');

			item.draggable = true;
			let inventoryGrid = document.querySelector('.inventory-grid');
			item.addEventListener('dragstart', (evt) => {
				evt.dataTransfer.setData("text/plain", evt.target.itemRef);
				
				inventoryGrid.addEventListener('dragover', function drop(evt) {
					evt.preventDefault();
				}, false);

				inventoryGrid.addEventListener('dragenter', function drop(evt) {
					evt.preventDefault();
				}, false);

				inventoryGrid.addEventListener('drop', (evt) => {
					let data = evt.dataTransfer.getData("text");
					addItemToInventoryFromTrade(data, _player);
					evt.dataTransfer.clearData();
					let clonedInventoryGrid = inventoryGrid.cloneNode(true);
					inventoryGrid.parentNode.replaceChild(clonedInventoryGrid, inventoryGrid); 

					updateInventoryGrid(_player.inventory.items, _player);
				});
			}, false);

			playerTradeSlotsElem.appendChild(item);
			playerTradeSlotsElem.slotId = i;
			playerTradeSlotsElem.addEventListener('click', selectTradeSlot, false);
		}
	}
	
}

export function updateTradeBalanceString(actorTrading, balance) {
	'use strict';
	let tradeString = document.getElementById('trade-string');
	let actorName = actorTrading.vars.actorName;
	if (balance >= 0) {
		tradeString.innerHTML = `You owe ${actorName} ${Math.abs(balance)} gold coins.`;
	}
	else {
		tradeString.innerHTML = `${actorName} owes you ${Math.abs(balance)} gold coins.`;
	}
}

function selectTradeSlotActor(event) {
	'use strict';
	let slot = document.getElementById(event.target.id);
	let slotCopy = slot.cloneNode(true);
	slotCopy.index = slot.index;
	slot.parentNode.replaceChild(slotCopy, slot);
	slotCopy.style.border = 'solid 2px black';
	selectTradeSlot(slotCopy, true);
	slotCopy.addEventListener('click', unselectTradeSlotActor, false);
}

function unselectTradeSlotActor(event) {
	'use strict';
	let slot = document.getElementById(event.target.id);
	let slotCopy = slot.cloneNode(true);
	slotCopy.index = slot.index;
	slot.parentNode.replaceChild(slotCopy, slot);
	slotCopy.style.border = '';
	unselectTradeSlot(slotCopy, true);
	slotCopy.addEventListener('click', selectTradeSlotActor, false);
}