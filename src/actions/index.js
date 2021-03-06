import * as ACTION_TYPES from '../constants/ActionTypes';
import * as MESSAGES from '../constants/Messages';
import * as Utils from '../utils';

export const createNewBus = position => ({
  type: ACTION_TYPES.CREATE_NEW_BUS,
  newBus: position,
});

export const setSelectedBusId = busId => ({
  type: ACTION_TYPES.SET_SELECTED_BUS,
  busId,
});

export const moveExistingBus = (position, id) => ({
  type: ACTION_TYPES.MOVE_EXISTING_BUS,
  newPosition: position,
  busId: id,
});

export const setNotification = message => ({
  type: ACTION_TYPES.SET_NOTIFICATION,
  message,
});

export const setReport = message => ({
  type: ACTION_TYPES.SET_REPORT,
  message,
});

export const clearAllBuses = () => ({
  type: ACTION_TYPES.CLEAR_ALL_BUSES,
});

/**
 * select the target bus
 * @param  {String} busId [target bus's id.
 *                          If undefined, set the last insert one.
 *                          If null, set it as empty.]
 * @return {null}          [Dispatches the related action]
 */
export const selectBus = busId => (dispatch, getState) => {
  let selectedBusId;
  const { buses } = getState();
  if (busId === null || buses.length === 0) {
    selectedBusId = null;
  } else {
    const selectedBus = buses.find((bus, i) =>
      (bus.id === busId || i === buses.length - 1));
    selectedBusId = selectedBus.id;
  }
  dispatch(setSelectedBusId(selectedBusId));
};

/**
 * [placeBus move an exsiting bus or place a new one in the carpack]
 * @param  {Object} position [The new position will the bus locate,
 *                          must include attributes: posX(int), posY(int), direction(string)]
 * @param  {String} id       [The id of bus which is going to move, if null, create a new one]
 * @return {null}          [Dispatches the related action]
 */
export const placeBus = (position, id) => (dispatch, getState) => {
  // check whether the park unit is already covered or not.
  const { buses, parkSize } = getState();
  if (!Utils.checkInsidePark(position, parkSize)) {
    dispatch(setNotification(MESSAGES.NOTIFICATION_OUTSIDE_PARK));
  } else if (Utils.checkBusExists(position, buses, id)) {
    dispatch(setNotification(MESSAGES.NOTIFICATION_UNIT_TAKEN));
  } else if (id) {
    dispatch(moveExistingBus(position, id));
    dispatch(setNotification(''));
  } else if (Utils.isValidDirection(position.direction)) {
    dispatch(createNewBus(position));
    dispatch(selectBus());
    dispatch(setNotification(''));
  }
};
