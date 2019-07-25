
import tavern from '../locations/city/tavern/Tavern.js';
import market from '../locations/city/Market.js';
import castle from '../locations/city/Castle.js';
import docks from '../locations/city/docks/Docks.js';
import gatehouseW from '../locations/city/GatehouseWest/GatehouseWest.js';
import sewer from '../locations/city/SewerEntrance.js';
import slums from '../locations/city/slums/Slums.js';

import horRoad from '../locations/horRoad.js';
import verRoad from '../locations/verRoad.js';
import crossRoad from '../locations/crossRoad.js';

export default {
    img: 'https://via.placeholder.com/418x345',
    nodes: {
        0: ['none', 'none', 'none', 'none', castle, horRoad, market, 'none'],
        1: ['none', 'none', 'none', 'none', 'none', 'none', verRoad, 'none'],
        2: ['none', gatehouseW, horRoad, tavern, horRoad, horRoad, crossRoad, docks],
        3: ['none', 'none', 'none', 'none', verRoad, 'none', 'none', 'none'],
        4: ['none', 'none', 'none', 'none', crossRoad, slums, horRoad, sewer]
    }
};