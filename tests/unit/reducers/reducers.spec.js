import * as ACTION_TYPES from '../../../src/constants/ActionTypes';
import Reducer, { INITIAL_STATE } from '../../../src/reducers';
import TEST_BUSES from '../../test-data/buses';

describe('view reducers', () => {
  let initialState = INITIAL_STATE;

  afterEach(() => {
    initialState = INITIAL_STATE;
  });

  it('should do nothing if action name is not matched', () => {
    const action = { type: null };
    const state = Reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('handles action CREATE_NEW_BUS', () => {
    const action = {
      type: ACTION_TYPES.CREATE_NEW_BUS,
      newBus: TEST_BUSES.NEW_BUS,
    };
    const state = Reducer({
      ...initialState,
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
    }, action);
    expect(state.buses[state.buses.length - 1])
      .toEqual(jasmine.objectContaining(TEST_BUSES.NEW_BUS));
  });

  it('handles action SET_SELECTED_BUS', () => {
    const selectedBusId = '1';
    const action = {
      type: ACTION_TYPES.SET_SELECTED_BUS,
      busId: selectedBusId,
    };
    const state = Reducer(initialState, action);
    expect(state).toEqual(jasmine.objectContaining({ selectedBusId }));
  });

  it('handles action MOVE_EXISTING_BUS', () => {
    const action = {
      type: ACTION_TYPES.MOVE_EXISTING_BUS,
      busId: TEST_BUSES.BUS_1.id,
      newPosition: TEST_BUSES.BUS_1_MOVE,
    };
    const state = Reducer({
      ...initialState,
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
    }, action);
    expect(state.buses[0]).toEqual(jasmine.objectContaining(TEST_BUSES.BUS_1_MOVE));
  });

  it('handles action SET_NOTIFICATION', () => {
    const message = 'warning';
    const action = {
      type: ACTION_TYPES.SET_NOTIFICATION,
      message,
    };
    const state = Reducer(initialState, action);
    expect(state).toEqual(jasmine.objectContaining({ notification: message }));
  });

  it('handles action SET_REPORT', () => {
    const message = '0,0,NORTH';
    const action = {
      type: ACTION_TYPES.SET_REPORT,
      message,
    };
    const state = Reducer(initialState, action);
    expect(state).toEqual(jasmine.objectContaining({ report: message }));
  });
});
