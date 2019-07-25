import {
    showTradeWindow,
    hideTradeWindow,
    updateTradeSlots,
    updateTradeBalanceString,
    updatePlayerUI
} from "./UI.mjs";

import {
    Item
} from "./item.js";

let actorItemsForTrade = [];
let actorTrading;
let actorItemsSelected = [];
let playerItemsForTrade = [];
let tradeBalance = 0;
let _player;

export function getActorItemsForTrade() {
    'use strict';
    return actorItemsForTrade;
}

export function getPlayerItemsForTrade() {
    'use strict';
    return playerItemsForTrade;
}

export function beginTrade(actor, player) {
    'use strict';
    _player = player;
    actorTrading = actor;
    actorItemsForTrade = actor.vars.itemsForTrade;
    showTradeWindow(actorItemsForTrade);
    updateTradeBalance();
}

export function addItemToTradeWindow(itemRef, player) {
    'use strict';
    let item = player.inventory.getItemByRef(itemRef);
    playerItemsForTrade.push(item);
    player.inventory.removeItemByRef(itemRef);
    tradeBalance -= item.value;
    updateTradeBalance();
    updateTradeSlots();
}

export function addItemToInventoryFromTrade(itemRef, player) {
    'use strict';

    if (!player.inventory.itemInInventoryByRef(itemRef)) {
        player.inventory.addItemToInventoryByRef(itemRef);
    }

    let removedItem = playerItemsForTrade.filter((item) => {
        return item.itemRef == itemRef;
    });

    playerItemsForTrade = playerItemsForTrade.filter((item) => {
        return item.itemRef != itemRef;
    });
    let item = player.inventory.getItemByRef(itemRef);



    tradeBalance += item.value;
    updateTradeBalance();
    updateTradeBalanceString(actorTrading, tradeBalance);
    updateTradeSlots(removedItem);
}

export function selectTradeSlot(slotElem, isActorSlot) {
    'use strict';
    actorItemsSelected.push(actorItemsForTrade[slotElem.index]);
    tradeBalance += actorItemsForTrade[slotElem.index].value;

    updateTradeBalanceString(actorTrading, tradeBalance);

}

export function unselectTradeSlot(slotElem, isActorSlot) {
    'use strict';
    actorItemsSelected = actorItemsSelected.filter((e) => {
        return e !== actorItemsForTrade[slotElem.index];
    });
    tradeBalance -= actorItemsForTrade[slotElem.index].value;
    updateTradeBalanceString(actorTrading, tradeBalance);
}

function updateTradeBalance() {
    'use strict';
    let tradeBalance = 0;
    for (let i = 0; i < playerItemsForTrade.length; i++) {
        tradeBalance += playerItemsForTrade[i].value;
    }
    updateTradeBalanceString(actorTrading, tradeBalance);
}

export function clickCompleteTrade(event) {
    'use strict';
    if (tradeBalance > 0) {
        if (_player.vars.gold >= tradeBalance) {
            _player.vars.gold -= tradeBalance;
            actorItemsSelected.forEach(item => {
                _player.inventory.addItemToInventoryByRef(item.itemRef);
            });

            hideTradeWindow();
            updatePlayerUI(_player);
        } else {
            console.log('you dont have ' + tradeBalance + 'gold');
            //you too broke son
        }
    } else if (tradeBalance <= 0) {
        if (actorTrading.vars.gold >= tradeBalance) {
            actorTrading.vars.gold -= tradeBalance;
            hideTradeWindow();
        } else {
            //(s)he's too broke
        }
    }
}