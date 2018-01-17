import * as CONSTANTS from '../../src/constants';

const buses = {
  BUS_1: {
    id: '1',
    posX: 0,
    posY: 0,
    direction: CONSTANTS.DIR_NORTH,
  },
  BUS_1_MOVE: {
    posX: 1,
    posY: 0,
    direction: CONSTANTS.DIR_NORTH,
  },
  BUS_2: {
    id: '2',
    posX: 4,
    posY: 0,
    direction: CONSTANTS.DIR_EAST,
  },
  BUS_3: {
    id: '3',
    posX: 0,
    posY: 4,
    direction: CONSTANTS.DIR_SOUTH,
  },
  BUS_4: {
    id: '4',
    posX: 4,
    posY: 4,
    direction: CONSTANTS.DIR_WEST,
  },
  NEW_BUS: {
    posX: 2,
    posY: 2,
    direction: CONSTANTS.DIR_WEST,
  },
  NEW_BUS_OUT_X: {
    posX: 200,
    posY: 2,
    direction: CONSTANTS.DIR_WEST,
  },
  NEW_BUS_OUT_Y: {
    posX: 2,
    posY: 200,
    direction: CONSTANTS.DIR_WEST,
  },
  NEW_BUS_EXIST: {
    posX: 0,
    posY: 0,
    direction: CONSTANTS.DIR_WEST,
  },
  NEW_BUS_ERROR: {
    posX: 0,
    posY: 2,
    direction: 'wrong direction',
  },
};

export default buses;
