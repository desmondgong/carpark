import * as ACTION_TYPES from '../constants/ActionTypes';

export const INITIAL_STATE = {
  buses: [],
  selectedBusId: '',
  parkSize: 5,
  notification: '',
  report: '',
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_NEW_BUS:
      return {
        ...state,
        // TODO: The new bus's Id is automatically set, move this to support customized id.
        buses: [...state.buses, { ...action.newBus, id: `${state.buses.length + 1}` }],
      };
    case ACTION_TYPES.SET_SELECTED_BUS:
      return {
        ...state,
        selectedBusId: action.busId,
      };
    case ACTION_TYPES.MOVE_EXISTING_BUS:
      return {
        ...state,
        buses: state.buses.map(bus =>
          ((bus.id === action.busId) ? { ...bus, ...action.newPosition } : bus)),
      };
    case ACTION_TYPES.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.message,
      };
    case ACTION_TYPES.SET_REPORT:
      return {
        ...state,
        report: action.message,
      };
    case ACTION_TYPES.CLEAR_ALL_BUSES:
      return INITIAL_STATE;
    default:
      return state;
  }
};
