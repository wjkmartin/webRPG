import gatehouseE from '../locations/field/GatehouseEast/GatehouseEast.js';

import horRoad from '../locations/horRoad.js';
import verRoad from '../locations/verRoad.js';
import crossRoad from '../locations/crossRoad.js';

export default {
    img: 'https://via.placeholder.com/418x345',
    nodes: {
        0: [crossRoad, horRoad, crossRoad, crossRoad, horRoad, crossRoad, 'none', crossRoad],
        1: ['none', 'none', crossRoad, 'none', 'none', verRoad, 'none', verRoad],
        2: ['none', horRoad, crossRoad, crossRoad, horRoad, horRoad, horRoad, gatehouseE],
        3: [verRoad, 'none', verRoad, 'none', 'none', verRoad, 'none', verRoad],
        4: [crossRoad, horRoad, crossRoad, 'none', 'none', crossRoad, horRoad, crossRoad]
    }
};