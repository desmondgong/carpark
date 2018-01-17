import React from 'react';
import { shallow } from 'enzyme';
import Bus from '../../../src/components/Bus';

describe('<Bus />', () => {
  const initialProps = {
    id: '',
    direction: '',
    className: '',
  };

  it('should render a Bus', () => {
    const componentsWrapper = shallow(<Bus {...initialProps} />);
    expect(componentsWrapper.find('div.bus').length).toEqual(1);
  });

  it('should render a Bus with specific className', () => {
    const speicificClass = 'mini-bus';
    const props = { ...initialProps, className: speicificClass };
    const componentsWrapper = shallow(<Bus {...props} />);
    expect(componentsWrapper.find(`div.${speicificClass}`).length).toEqual(1);
  });
});
