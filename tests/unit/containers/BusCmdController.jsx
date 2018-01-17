import React from 'react';
import { mount, shallow } from 'enzyme';
import { BusCmdControllerCom } from '../../../src/containers/BusCmdController';
import * as Utils from '../../../src/utils';
import TEST_BUSES from '../../test-data/buses';
import TEST_CMDS from '../../test-data/cmds';

describe('<BusCmdController />', () => {
  const initialProps = {
    buses: [],
    selectedBusId: '',
    changeBusPos: () => {},
    switchBus: () => {},
  };

  it('should render BusCmdController.', () => {
    const componentsWrapper = mount(<BusCmdControllerCom {...initialProps} />);
    expect(componentsWrapper.find('section.cmd-controller').length).toEqual(1);
  });

  it('should create new bus when calling onCreateNewBus().', () => {
    spyOn(initialProps, 'changeBusPos');
    const componentsWrapper = shallow(<BusCmdControllerCom {...initialProps} />);
    const newPosition = { posX: 1, posY: 1, direction: '' };
    componentsWrapper.instance().onCreateNewBus(newPosition);
    expect(initialProps.changeBusPos).toHaveBeenCalledWith(newPosition);
  });

  it('should turn selected bus when calling onTurnBus().', () => {
    spyOn(initialProps, 'changeBusPos');
    const props = {
      ...initialProps,
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
      selectedBusId: TEST_BUSES.BUS_1.id,
    };
    const componentsWrapper = shallow(<BusCmdControllerCom {...props} />);
    let isClockwise = false;
    componentsWrapper.instance().onTurnBus(isClockwise);
    expect(initialProps.changeBusPos).toHaveBeenCalledWith({
      posX: TEST_BUSES.BUS_1.posX,
      posY: TEST_BUSES.BUS_1.posY,
      direction: Utils.rotateBus(TEST_BUSES.BUS_1.direction, isClockwise),
    }, TEST_BUSES.BUS_1.id);

    isClockwise = true;
    componentsWrapper.instance().onTurnBus(isClockwise);
    expect(initialProps.changeBusPos).toHaveBeenCalledWith({
      posX: TEST_BUSES.BUS_1.posX,
      posY: TEST_BUSES.BUS_1.posY,
      direction: Utils.rotateBus(TEST_BUSES.BUS_1.direction, isClockwise),
    }, TEST_BUSES.BUS_1.id);
  });

  it('should do nothing if no selected bus when calling onTurnBus().', () => {
    spyOn(initialProps, 'changeBusPos');
    const props = {
      ...initialProps,
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
    };
    const componentsWrapper = shallow(<BusCmdControllerCom {...props} />);
    componentsWrapper.instance().onTurnBus(true);
    expect(initialProps.changeBusPos).not.toHaveBeenCalled();
  });

  it('should move selected bus when calling onMoveBus().', () => {
    spyOn(initialProps, 'changeBusPos');
    const props = {
      ...initialProps,
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
      selectedBusId: TEST_BUSES.BUS_1.id,
    };
    const componentsWrapper = shallow(<BusCmdControllerCom {...props} />);
    const isForward = true;
    componentsWrapper.instance().onMoveBus(isForward);
    expect(initialProps.changeBusPos).toHaveBeenCalledWith(
      Utils.moveBus(TEST_BUSES.BUS_1, isForward), TEST_BUSES.BUS_1.id);
  });

  it('should do nothing if no selected bus when calling onMoveBus().', () => {
    spyOn(initialProps, 'changeBusPos');
    const props = {
      ...initialProps,
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
    };
    const componentsWrapper = shallow(<BusCmdControllerCom {...props} />);
    componentsWrapper.instance().onMoveBus(true);
    expect(initialProps.changeBusPos).not.toHaveBeenCalled();
  });

  it('should switch selected bus when calling onSwitchBus().', () => {
    const busId = '1';
    spyOn(initialProps, 'switchBus');
    const componentsWrapper = shallow(<BusCmdControllerCom {...initialProps} />);
    componentsWrapper.instance().onSwitchBus(busId);
    expect(initialProps.switchBus).toHaveBeenCalledWith(busId);
  });

  it('should upload file and set cmds in state from the file.', (done) => {
    const componentsWrapper = mount(<BusCmdControllerCom {...initialProps} />);
    const fileContents = 'place 0,0,north';
    const blob = new window.Blob([fileContents], { type: 'text/plain' });
    componentsWrapper.find('#file').simulate('change', { target: { files: [blob] } });
    setTimeout(() => {
      expect(componentsWrapper.state('cmds')).toEqual(fileContents);
      done();
    }, 100);
  });

  it('should not set cmds in state if no file found.', (done) => {
    const componentsWrapper = mount(<BusCmdControllerCom {...initialProps} />);
    componentsWrapper.find('#file').simulate('change', { target: { files: [] } });
    setTimeout(() => {
      expect(componentsWrapper.state('cmds')).toEqual('');
      done();
    }, 100);
  });

  it('should parse and execute cmds from cmds in state.', (done) => {
    const componentsWrapper = shallow(<BusCmdControllerCom {...initialProps} />);
    spyOn(componentsWrapper.instance(), 'onCreateNewBus');
    spyOn(componentsWrapper.instance(), 'onTurnBus');
    spyOn(componentsWrapper.instance(), 'onMoveBus');
    componentsWrapper.setState({ cmds: TEST_CMDS.CMD_CORRECT });
    componentsWrapper.find('#cmd-exec').simulate('click');
    setTimeout(() => {
      expect(componentsWrapper.instance().onCreateNewBus.calls.count()).toEqual(1);
      expect(componentsWrapper.instance().onTurnBus.calls.count()).toEqual(2);
      expect(componentsWrapper.instance().onMoveBus.calls.count()).toEqual(1);
      done();
    }, 100);
  });

  it('should parse and execute cmds from cmds in state, when the place format is incorrect', (done) => {
    const componentsWrapper = shallow(<BusCmdControllerCom {...initialProps} />);
    spyOn(componentsWrapper.instance(), 'onCreateNewBus');
    spyOn(componentsWrapper.instance(), 'onTurnBus');
    spyOn(componentsWrapper.instance(), 'onMoveBus');
    componentsWrapper.setState({ cmds: TEST_CMDS.CMD_ERROR_INCORRECT_FORMAT });
    componentsWrapper.find('#cmd-exec').simulate('click');
    setTimeout(() => {
      expect(componentsWrapper.instance().onCreateNewBus.calls.count()).toEqual(0);
      expect(componentsWrapper.instance().onTurnBus.calls.count()).toEqual(2);
      expect(componentsWrapper.instance().onMoveBus.calls.count()).toEqual(1);
      done();
    }, 100);
  });
});
