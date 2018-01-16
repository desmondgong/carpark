import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Bus = ({ id, direction, className }) => {
  const domClass = classnames('bus', className);
  return (<div className={domClass} >{`${id}, ${direction}`}</div>);
};

Bus.propTypes = {
  id: PropTypes.string,
  direction: PropTypes.string,
  className: PropTypes.string,
};


export default Bus;
