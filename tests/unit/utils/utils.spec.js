import * as Utils from '../../../src/utils';
import TEST_BUSES from '../../test-data/buses';
import * as CONSTANTS from '../../../src/constants';

describe('Utils', () => {
  it('should return correct boolean for checkBusExists().', () => {
    const existingBuses = [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4];
    let newPosition = {
      posX: TEST_BUSES.BUS_1.posX,
      posY: TEST_BUSES.BUS_1.posY,
    };
    expect(Utils.checkBusExists(newPosition, existingBuses)).toEqual(true);
    expect(Utils.checkBusExists(newPosition, existingBuses, TEST_BUSES.BUS_1.id))
      .toEqual(false, 'should be false if the target bus is itself.');
    newPosition = {
      posX: TEST_BUSES.NEW_BUS.posX,
      posY: TEST_BUSES.NEW_BUS.posY,
    };
    expect(Utils.checkBusExists(newPosition, existingBuses)).toEqual(false);
    expect(Utils.checkBusExists(newPosition, existingBuses, TEST_BUSES.BUS_1.id)).toEqual(false);

    newPosition = {
      x: TEST_BUSES.NEW_BUS.posX,
      y: TEST_BUSES.NEW_BUS.posY,
    };
    expect(Utils.checkBusExists(newPosition, existingBuses))
      .toEqual(false, 'should be false if the necessary attributes are not set.');
    expect(Utils.checkBusExists(undefined, existingBuses))
      .toEqual(false, 'should be false if the new Position is not provided');
    expect(Utils.checkBusExists()).toEqual(false);
  });

  it('should return correct boolean for checkInsidePark().', () => {
    const parkSize = 5;
    expect(Utils.checkInsidePark({ posX: 2, posY: 2 }, parkSize)).toEqual(true);
    expect(Utils.checkInsidePark({ posX: 200, posY: 2 }, parkSize)).toEqual(false);
    expect(Utils.checkInsidePark({ posX: 2, posY: 200 }, parkSize)).toEqual(false);
    expect(Utils.checkInsidePark({ posX: -1, posY: 2 }, parkSize)).toEqual(false);
    expect(Utils.checkInsidePark({ posX: 2, posY: 200 }))
      .toEqual(false, 'should be false as the default parkSize is 0.');
  });

  it('should return correct direction for rotateBus().', () => {
    expect(Utils.rotateBus(CONSTANTS.DIR_NORTH, true)).toEqual(CONSTANTS.DIR_EAST);
    expect(Utils.rotateBus(CONSTANTS.DIR_NORTH, false)).toEqual(CONSTANTS.DIR_WEST);
    expect(Utils.rotateBus(CONSTANTS.DIR_EAST, true)).toEqual(CONSTANTS.DIR_SOUTH);
    expect(Utils.rotateBus(CONSTANTS.DIR_EAST, false)).toEqual(CONSTANTS.DIR_NORTH);
    expect(Utils.rotateBus(CONSTANTS.DIR_SOUTH, true)).toEqual(CONSTANTS.DIR_WEST);
    expect(Utils.rotateBus(CONSTANTS.DIR_SOUTH, false)).toEqual(CONSTANTS.DIR_EAST);
    expect(Utils.rotateBus(CONSTANTS.DIR_WEST, true)).toEqual(CONSTANTS.DIR_NORTH);
    expect(Utils.rotateBus(CONSTANTS.DIR_WEST, false)).toEqual(CONSTANTS.DIR_SOUTH);

    expect(Utils.rotateBus('wrong', true)).toEqual('');
    expect(Utils.rotateBus('wrong', false)).toEqual('');
  });

  it('should return correct position for moveBus().', () => {
    const currentPosition = {
      posX: 2,
      posY: 2,
      direction: CONSTANTS.DIR_NORTH,
    };
    expect(Utils.moveBus(currentPosition, true)).toEqual({
      ...currentPosition,
      posY: currentPosition.posY + 1,
    });
    expect(Utils.moveBus(currentPosition, false)).toEqual({
      ...currentPosition,
      posY: currentPosition.posY - 1,
    });

    currentPosition.direction = CONSTANTS.DIR_SOUTH;
    expect(Utils.moveBus(currentPosition, true)).toEqual({
      ...currentPosition,
      posY: currentPosition.posY - 1,
    });
    expect(Utils.moveBus(currentPosition, false)).toEqual({
      ...currentPosition,
      posY: currentPosition.posY + 1,
    });

    currentPosition.direction = CONSTANTS.DIR_WEST;
    expect(Utils.moveBus(currentPosition, true)).toEqual({
      ...currentPosition,
      posX: currentPosition.posX - 1,
    });
    expect(Utils.moveBus(currentPosition, false)).toEqual({
      ...currentPosition,
      posX: currentPosition.posX + 1,
    });

    currentPosition.direction = CONSTANTS.DIR_EAST;
    expect(Utils.moveBus(currentPosition, true)).toEqual({
      ...currentPosition,
      posX: currentPosition.posX + 1,
    });
    expect(Utils.moveBus(currentPosition, false)).toEqual({
      ...currentPosition,
      posX: currentPosition.posX - 1,
    });

    currentPosition.direction = 'wrong';
    expect(Utils.moveBus(currentPosition, true)).toEqual(currentPosition);
    expect(Utils.moveBus(currentPosition, false)).toEqual(currentPosition);
  });
});
