export default {
    meet: {
        text: 'You look lost, boy. Tell me, what brings you to The Court of the Unburdened here in the slums?',
        pointers: {
            r_1: 'One of your people stole a magic apple and I want it back. I want to do this without further bloodshed.',
            r_2: 'I\'m here to kill you and take your stuff.'
        },
    },
    r_1: {
        id: 'r_1',
        text: 'That is not true! You suck! ',
        pointers: {
            'r_1_1': 'You see, I need it.',
            'r_1_2': 'Uhh, maybe I\'m mistaken, my bad'
        }
    },
    r_2: {
        id: 'r_2',
        text: 'You\'re quite brave, challenging me, you little weakling. I\'ll enjoy leaving you in the gutters like the trash you are.',
        pointers: {
            'r_1': 'Prepare to die'
        },
    },
    r_1_1: {
        id: 'r_1_1',
        text: 'Do a charisma check here or something',
        requirements: {
            'r_3': ['charisma', 15]
        },
        pointers: {
            'r_3': 'Please...?'
        }
    },
    r_1_2: {
        id: 'r_1_2',
        onclick: function(player) {
            console.log(player.vars.intelligence)
        },
        text: 'You think that you can just come here and question me and get away with it? Not likely kid.',
        pointers: {
            'r_1': 'reset'
        }
    },
    r_3: {
        id: 'r_3',
        
        text: 'Success!',
        pointers: {
            'r_1': 'reset'
        }
    },

}