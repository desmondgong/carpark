import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { placeBus, selectBus, setReport } from '../actions';
import * as Utils from '../utils';

// TODO Use a composition to set the movment function,
// there are still some issues in Unit Test.
const WithBusController = (WrappedComponent, mapStateToProps) => {
  class BusController extends PureComponent {
    constructor(props) {
      super(props);
      this.onCreateNewBus = this.onCreateNewBus.bind(this);
      this.onTurnBus = this.onTurnBus.bind(this);
      this.onMoveBus = this.onMoveBus.bind(this);
      this.onSwitchBus = this.onSwitchBus.bind(this);
      this.onReportPos = this.onReportPos.bind(this);
    }

    onCreateNewBus({ posX, posY, direction }) {
      const { changeBusPos } = this.props;
      return changeBusPos({ posX, posY, direction });
    }

    onTurnBus(isClockwise) {
      const { buses, selectedBusId, changeBusPos } = this.props;
      if (!selectedBusId) {
        // TODO add error message and logs.
        return Promise.resolve();
      }
      const selectedBus = buses.find(bus => bus.id === selectedBusId);
      return changeBusPos({
        posX: selectedBus.posX,
        posY: selectedBus.posY,
        direction: Utils.rotateBus(selectedBus.direction, isClockwise),
      }, selectedBusId);
    }

    onMoveBus(isForward) {
      const { buses, selectedBusId, changeBusPos } = this.props;
      if (!selectedBusId) {
        // TODO add error message and logs.
        return Promise.resolve();
      }
      const selectedBus = buses.find(bus => bus.id === selectedBusId);
      return changeBusPos(Utils.moveBus(selectedBus, isForward), selectedBusId);
    }

    onSwitchBus(busId) {
      const { switchBus } = this.props;
      return switchBus(busId);
    }

    onReportPos(isClearMsg) {
      const { buses, selectedBusId, changeReport } = this.props;
      if (isClearMsg) {
        return changeReport('');
      }
      const selectedBus = buses.find(bus => bus.id === selectedBusId);
      if (selectedBus) {
        const currentPosMsg = `${selectedBus.posX},${selectedBus.posY},${selectedBus.direction}`;
        return changeReport(currentPosMsg);
      }
      return Promise.resolve();
    }

    render() {
      return (<WrappedComponent
        {...this.props}
        onCreateNewBus={this.onCreateNewBus}
        onTurnBus={this.onTurnBus}
        onMoveBus={this.onMoveBus}
        onSwitchBus={this.onSwitchBus}
        onReportPos={this.onReportPos}
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
    changeReport: PropTypes.func,
  };

  /* istanbul ignore next */
  const defualtMapStateToProps = state => ({
    ...mapStateToProps(state),
    buses: state.buses,
    selectedBusId: state.selectedBusId,
  });

  /* istanbul ignore next */
  const mapDispatchToProps = dispatch => ({
    changeBusPos(position, busId) {
      return dispatch(placeBus(position, busId));
    },
    switchBus(busId) {
      return dispatch(selectBus(busId));
    },
    changeReport(message) {
      return dispatch(setReport(message));
    },
  });
  return connect(defualtMapStateToProps, mapDispatchToProps)(BusController);
};

export default WithBusController;
