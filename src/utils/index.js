import * as CONSTANTS from '../constants';

/**
 * Check whether the direction is valid or not.
 * @param  {String}  direction [The supported directions are set in CONSTANTS]
 * @return {Boolean}           [Return ture if valid]
 */
export const isValidDirection = direction => (CONSTANTS.DIR_ALL.indexOf(direction) > -1);

/**
 * Check whether there is another bus stops at the target unit.
 * @param  {Object} [newPosition]   [The new position will the bus locate,
 *                                     must include attributes: posX(int), posY(int)]
 * @param  {Array}  [existingBuses] [The existing buses' position,
 *                                   the element in the array is object which includes
 *                                   the attributes:: posX(int), posY(int)]
 * @param  {String} id              [Bus id, if exist, need to check whether it is the same bus.
 *                                  For the cases: turning bus's directions.]
 * @return {Boolean}                [Return true if exists, false if no]
 */
export const checkBusExists = (newPosition = {}, existingBuses = [], id) => {
  for (let i = 0; i < existingBuses.length; i += 1) {
    const bus = existingBuses[i];
    if (newPosition.posX === bus.posX
       && newPosition.posY === bus.posY
       && (!id || id !== bus.id)) {
      return true;
    }
  }
  return false;
};

/**
 * Check the target position is inside carpark or not
 * @param  {Object} [newPosition]  [Target position]
 * @param  {Number} [parkSize]     [Park size]
 * @return {Boolean}               [Return true if inside]
 */
export const checkInsidePark = (newPosition = {}, parkSize = 0) => {
  if (newPosition.posX < 0 || newPosition.posY < 0 ||
      newPosition.posX >= parkSize || newPosition.posY >= parkSize) {
    return false;
  }
  return true;
};

/**
 * Rotate bus with 90 degree in clockwise or anticlockwise
 * @param  {String}  currentDirection   [Current direction,
 *                                        the supported ones are set in CONSTANTS]
 * @param  {Boolean} [isClockwise]      [Turning direction, true for clockwise]
 * @return {String}                     [Return the new direction,
 *       Notice: if the direction passed in is not supported, return empty string]
 */
export const rotateBus = (currentDirection, isClockwise = false) => {
  const directionsArray = CONSTANTS.DIR_ALL;
  let index = null;
  directionsArray.forEach((dir, i) => {
    if (dir === currentDirection) {
      index = i;
    }
  });
  if (index == null) {
    return '';
  } else if (isClockwise) {
    return directionsArray[(index + 1) % directionsArray.length];
  }
  return directionsArray[((index + directionsArray.length) - 1) % directionsArray.length];
};

/**
 * Move the bus forward or backward.
 * @param  {Object}  [currentPosition]  [Current position of the bus,
 *                                    must include attributes: posX(int), posY(int)]
 * @param  {Boolean} isForward          [Moving forward or backward]
 * @return {Object}                    [Return the new position after moving,
 *        Notice: if the currentPosition is not supported, return the same one.]
 */
export const moveBus = (currentPosition = {}, isForward) => {
  let moveDir = currentPosition.direction;
  if (!isForward) {
    let index;
    CONSTANTS.DIR_ALL.forEach((dir, i) => {
      if (dir === moveDir) {
        index = i;
      }
    });
    if (index !== undefined) {
      moveDir = CONSTANTS.DIR_ALL[(index + 2) % CONSTANTS.DIR_ALL.length];
    }
  }
  switch (moveDir) {
    case CONSTANTS.DIR_NORTH:
      return {
        ...currentPosition,
        posY: currentPosition.posY + 1,
      };
    case CONSTANTS.DIR_SOUTH:
      return {
        ...currentPosition,
        posY: currentPosition.posY - 1,
      };
    case CONSTANTS.DIR_WEST:
      return {
        ...currentPosition,
        posX: currentPosition.posX - 1,
      };
    case CONSTANTS.DIR_EAST:
      return {
        ...currentPosition,
        posX: currentPosition.posX + 1,
      };
    default:
      return currentPosition;
  }
};
