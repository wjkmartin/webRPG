import { updateQuestUI } from './UI.mjs';

import { 
    test_quest1, 
    test_quest2
} from '../quests/master_list.js';

const MASTER_QUEST_LIST = {
    test_quest1: test_quest1, 
    test_quest2: test_quest2
};

let activeQuests = [];

export function getQuestData() {
    'use strict';
    return activeQuests;
}

export function startQuest(quest){
    'use strict';
    activeQuests.push(MASTER_QUEST_LIST[quest]);
    updateQuestUI();
}

export function updateQuestStage(quest, stage) {
    'use strict';

    let questIndex = activeQuests.findIndex(function(e) {
        return e.id == quest;
    });
   
    activeQuests[questIndex].stage = stage;
    updateQuestUI();
}