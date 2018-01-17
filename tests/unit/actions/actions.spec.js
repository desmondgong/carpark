import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../src/actions';
import * as ACTION_TYPES from '../../../src/constants/ActionTypes';
import TEST_BUSES from '../../test-data/buses';

describe('actions', () => {
  const mockStore = configureStore([thunk]);
  it('implements expected functions', () => {
    expect(actions.createNewBus).toEqual(jasmine.any(Function));
    expect(actions.setSelectedBusId).toEqual(jasmine.any(Function));
    expect(actions.moveExistingBus).toEqual(jasmine.any(Function));
    expect(actions.setNotification).toEqual(jasmine.any(Function));
    expect(actions.selectBus).toEqual(jasmine.any(Function));
    expect(actions.placeBus).toEqual(jasmine.any(Function));
  });

  it('should set the correct selectedBusId', () => {
    const busId = TEST_BUSES.BUS_1.id;
    const initialState = {
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
      parkSize: 5,
    };
    const store = mockStore(initialState);
    store.dispatch(actions.selectBus(busId));
    const expectedActions = [{
      type: ACTION_TYPES.SET_SELECTED_BUS,
      busId,
    }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should clear selectedBusId when set null', () => {
    const initialState = { buses: [], parkSize: 5 };
    const store = mockStore(initialState);
    store.dispatch(actions.selectBus(null));
    const expectedActions = [{
      type: ACTION_TYPES.SET_SELECTED_BUS,
      busId: null,
    }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should set the last bus\'s id as selectedBusId if set undefined', () => {
    const busId = TEST_BUSES.BUS_4.id;
    const initialState = {
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
      parkSize: 5,
    };
    const store = mockStore(initialState);
    store.dispatch(actions.selectBus());
    const expectedActions = [{
      type: ACTION_TYPES.SET_SELECTED_BUS,
      busId,
    }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should place a new bus if the target unit is not taken.', () => {
    const initialState = {
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
      parkSize: 5,
    };
    const newPosition = TEST_BUSES.NEW_BUS;
    const store = mockStore(initialState);
    store.dispatch(actions.placeBus(newPosition));
    // TODO As the reducer not works here,
    // the bus is not really inserted, so the busId still is the 4th one.
    const expectedActions = [{
      type: ACTION_TYPES.CREATE_NEW_BUS,
      newBus: newPosition,
    }, {
      type: ACTION_TYPES.SET_SELECTED_BUS,
      busId: TEST_BUSES.BUS_4.id,
    }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should move the bus.', () => {
    const initialState = {
      buses: [TEST_BUSES.BUS_1],
      parkSize: 5,
    };
    const newPosition = TEST_BUSES.BUS_1_MOVE;
    const selectedBusId = TEST_BUSES.BUS_1.id;
    const store = mockStore(initialState);
    store.dispatch(actions.placeBus(newPosition, selectedBusId));
    const expectedActions = [{
      type: ACTION_TYPES.MOVE_EXISTING_BUS,
      newPosition,
      busId: selectedBusId,
    }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should set a notice when placing a bus outside the carpark.', () => {
    const initialState = {
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
      parkSize: 5,
    };
    const newPosition = TEST_BUSES.NEW_BUS_OUT_X;
    const store = mockStore(initialState);
    store.dispatch(actions.placeBus(newPosition));
    const expectedActions = [{
      type: ACTION_TYPES.SET_NOTIFICATION,
      message: 'Target position is outside of park.',
    }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should set a notice when target unit is already taken.', () => {
    const initialState = {
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
      parkSize: 5,
    };
    const newPosition = TEST_BUSES.NEW_BUS_EXIST;
    const store = mockStore(initialState);
    store.dispatch(actions.placeBus(newPosition));
    const expectedActions = [{
      type: ACTION_TYPES.SET_NOTIFICATION,
      message: 'The park unit has been covered by another bus.',
    }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should do nothing when the new position is not set correctly.', () => {
    const initialState = {
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
      parkSize: 5,
    };
    const newPosition = TEST_BUSES.NEW_BUS_ERROR;
    const store = mockStore(initialState);
    store.dispatch(actions.placeBus(newPosition));
    const expectedActions = [];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
