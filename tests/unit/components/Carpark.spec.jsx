import React from 'react';
import { shallow, mount } from 'enzyme';
import Carpark from '../../../src/components/Carpark';
import TEST_BUSES from '../../test-data/buses';

describe('<Carpark />', () => {
  const initialProps = {
    buses: [],
    selectedBusId: '',
    parkSize: 5,
  };

  it('should render an empty carpark with 25 units.', () => {
    const componentsWrapper = shallow(<Carpark {...initialProps} />);
    expect(componentsWrapper.find('section.carpark-container').length).toEqual(1);
    expect(componentsWrapper.find('div.park-unit').length)
      .toEqual(initialProps.parkSize * initialProps.parkSize);
    expect(componentsWrapper.find('div.park-unit.boundary').length)
      .toEqual(initialProps.parkSize);
  });

  it('should render an carpark with some buses.', () => {
    const props = {
      ...initialProps,
      buses: [TEST_BUSES.BUS_1, TEST_BUSES.BUS_2, TEST_BUSES.BUS_3, TEST_BUSES.BUS_4],
      selectedBusId: TEST_BUSES.BUS_1.id,
    };
    const componentsWrapper = mount(<Carpark {...props} />);
    expect(componentsWrapper.find('div.park-unit.bus').length)
      .toEqual(props.buses.length);
    expect(componentsWrapper.find('div.park-unit.bus.selected').length)
      .toEqual(1);
  });
});
