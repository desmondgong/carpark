import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carpark from '../components/Carpark';
import BusCab from './BusCab';

class App extends Component {
  render() {
    const { buses, selectedBusId, parkSize, notification } = this.props;
    return (
      <div className={'carpark-container'}>
        <Carpark buses={buses} selectedBusId={selectedBusId} parkSize={parkSize} />
        <BusCab />
        { notification ? <span>{notification}</span> : null }
      </div>
    );
  }
}

App.propTypes = {
  buses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    posX: PropTypes.number,
    posY: PropTypes.number,
    direction: PropTypes.string,
  })),
  selectedBusId: PropTypes.string,
  parkSize: PropTypes.number,
  notification: PropTypes.string,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  buses: state.buses,
  selectedBusId: state.selectedBusId,
  parkSize: state.parkSize,
  notification: state.notification,
});

export { App as AppCom };
export default connect(mapStateToProps, null)(App);
