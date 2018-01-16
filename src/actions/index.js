import * as ACTION_TYPES from '../constants/ActionTypes';
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

/**
 * select the target bus
 * @param  {String} busId [target bus's id, set the last insert one if undefined.]
 * @return {null}          [Dispatches the related action]
 */
export const selectBus = busId => (dispatch, getState) => {
  const { buses } = getState();
  const selectedBus = buses.find((bus, i) =>
    (bus.id === busId || i === buses.length - 1));
  dispatch(setSelectedBusId(selectedBus.id));
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
    dispatch(setNotification('Target position is outside of park.'));
  } else if (Utils.checkBusExists(position, buses, id)) {
    dispatch(setNotification('The park unit has been covered by another bus.'));
  } else if (!id) {
    dispatch(createNewBus(position));
    dispatch(selectBus());
  } else {
    dispatch(moveExistingBus(position, id));
  }
};
