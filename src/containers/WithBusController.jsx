import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { placeBus, selectBus } from '../actions';
import * as Utils from '../utils';

// TODO Use a composition to set the movment function,
// there are still some issues in Unit Test.
const WithBusController = (WrappedComponent) => {
  class BusController extends PureComponent {
    constructor(props) {
      super(props);
      this.onCreateNewBus = this.onCreateNewBus.bind(this);
      this.onTurnBus = this.onTurnBus.bind(this);
      this.onMoveBus = this.onMoveBus.bind(this);
      this.onSwitchBus = this.onSwitchBus.bind(this);
    }

    onCreateNewBus({ posX, posY, direction }) {
      const { changeBusPos } = this.props;
      changeBusPos({ posX, posY, direction });
    }

    onTurnBus(isClockwise) {
      const { buses, selectedBusId, changeBusPos } = this.props;
      if (!selectedBusId) {
        // TODO add error message and logs.
        return;
      }
      const selectedBus = buses.find(bus => bus.id === selectedBusId);
      changeBusPos({
        posX: selectedBus.posX,
        posY: selectedBus.posY,
        direction: Utils.rotateBus(selectedBus.direction, isClockwise),
      }, selectedBusId);
    }

    onMoveBus(isForward) {
      const { buses, selectedBusId, changeBusPos } = this.props;
      if (!selectedBusId) {
        // TODO add error message and logs.
        return;
      }
      const selectedBus = buses.find(bus => bus.id === selectedBusId);
      changeBusPos(Utils.moveBus(selectedBus, isForward), selectedBusId);
    }

    onSwitchBus(busId) {
      const { switchBus } = this.props;
      switchBus(busId);
    }

    render() {
      return (<WrappedComponent
        {...this.props}
        onCreateNewBus={this.onCreateNewBus}
        onTurnBus={this.onTurnBus}
        onMoveBus={this.onMoveBus}
        onSwitchBus={this.onSwitchBus}
      />);
    }
  }
  BusController.propTypes = {
    buses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      posX: PropTypes.number,
      posY: PropTypes.number,
      direction: PropTypes.string,
    })),
    selectedBusId: PropTypes.string,
    changeBusPos: PropTypes.func,
    switchBus: PropTypes.func,
  };

  /* istanbul ignore next */
  const mapStateToProps = state => ({
    buses: state.buses,
    selectedBusId: state.selectedBusId,
  });

  /* istanbul ignore next */
  const mapDispatchToProps = dispatch => ({
    changeBusPos(position, busId) {
      dispatch(placeBus(position, busId));
    },
    switchBus(busId) {
      dispatch(selectBus(busId));
    },
  });
  return connect(mapStateToProps, mapDispatchToProps)(BusController);
};

export default WithBusController;
