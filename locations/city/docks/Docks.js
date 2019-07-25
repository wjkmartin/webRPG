import docks_brothel from './docks_brothel.js';
import docks_red_moon from './docks_red_moon.js';

export default {
    name: 'docks',
    icon: ['fas', 'fa-anchor'],
    buttonLabel: 'Return to the docks',
    prettyName: "The Port",
    description1: 'This is quite the busy port. You can see at least a few score ships, some hardly larger than rowboats, and a few massive Galleons. A particularly large vessel named "The Red Moon" currently sits in port, notably scant of sailors. A nearby brothel, "The Sextant" sees sailors come and go.',
    buttons: [docks_brothel, docks_red_moon],
    type: 'super'
};