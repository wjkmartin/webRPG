export default {
    meet: {
        text: 'You really think you’ll be the first $Hunter$ to find the $Reliquary$? The first person to open one even though $RHO$ has been out for two years? You! A measly level one?!',
        hasRefs: true,
        pointers: {
            r_1: 'You bet I will!',
            r_2: 'Well, I’ll try my best.'
        }
    },
    r_1: {
        text: 'Hah! You’re pathetic. I’m sure you’re pathetic in real life too. I’m going to enjoy beating the snot out of you.',
        pointers: {
            r_1_a: ['I\'m not afraid of you!'],
        }
    },
    r_2: {
        text: 'You’re just sad. Do you really think that someone with such a weak level of determination can actually find a legendary $Reliquary$? En gard!',
        hasRefs: true,
        pointers: {
            r_1_a: ['Uh oh.'],
        }
    },
    r_1_a: {
        text: '',
        action: 'startCombat'
    }
};