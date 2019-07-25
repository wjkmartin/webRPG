import tavern_inside from './tavern_inside.js';
import tavern_behind from './tavern_behind.js';

export default 
{
    name: 'tavern',
    icon: ['fas', 'fa-beer'],
    prettyName: "The Final Word",
    description1: 'From the outside, the tavern looks quiet and unassuming. The sound of clinking glasses and raucous conversation filters into the street from the ajar double doors. A small, angry-looking man stands nearby, selling potions out of a tray that\'s secured around his neck by a leather strap.',
    buttons: [tavern_inside, tavern_behind],
    buttonLabel: 'Return to the street.',
    type: 'super',
    coords: [2,3]
};