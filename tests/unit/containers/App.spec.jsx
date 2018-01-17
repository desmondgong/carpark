import React from 'react';
import { shallow } from 'enzyme';
import { AppCom } from '../../../src/containers/App';

describe('<App />', () => {
  const initialProps = {
    buses: [],
    selectedBusId: '',
    parkSize: 5,
    notification: '',
  };

  it('should render a main page.', () => {
    const componentsWrapper = shallow(<AppCom {...initialProps} />);
    expect(componentsWrapper.find('div.main-content').length).toEqual(1);
  });
});
