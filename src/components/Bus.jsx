import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BusSVG from '../resources/img/bus.svg';
import * as CONSTANTS from '../constants';

const Bus = ({ id, direction = CONSTANTS.DIR_NORTH, className }) => {
  const domClass = classnames('bus', className);
  const index = (CONSTANTS.DIR_ALL.indexOf(direction) >= 0) ?
    CONSTANTS.DIR_ALL.indexOf(direction) : 0;
  return (<div className={domClass}>
    <span className={'bus-id'} >{id}</span>
    <BusSVG transform={`rotate(${index * 90})`} />
  </div>);
};

Bus.propTypes = {
  id: PropTypes.string,
  direction: PropTypes.string,
  className: PropTypes.string,
};


export default Bus;
