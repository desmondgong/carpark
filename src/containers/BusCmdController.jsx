import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as CONSTANTS from '../constants';
import { placeBus, selectBus } from '../actions';
import * as Utils from '../utils';

class BusCmdController extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cmds: '',
    };
    this.onCreateNewBus = this.onCreateNewBus.bind(this);
    this.onTurnBus = this.onTurnBus.bind(this);
    this.onSwitchBus = this.onSwitchBus.bind(this);
    this.onParseCmds = this.onParseCmds.bind(this);
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

  onParseCmds() {
    const { cmds } = this.state;
    const cmdArray = cmds.toUpperCase().split('\n');
    cmdArray.forEach((cmd) => {
      // add setTimeout() here to wait until the last cmd is executed.
      setTimeout(() => {
        const cmdKeys = cmd.split(' ');
        const cmdType = cmdKeys[0];
        const cmdArgs = cmdKeys[1] ? cmdKeys[1].split(',') : [];
        switch (cmdType) {
          case CONSTANTS.CMD_PLACE:
            if (cmdArgs.length > 2) {
              this.onCreateNewBus({
                posX: parseInt(cmdArgs[0], 10),
                posY: parseInt(cmdArgs[1], 10),
                direction: cmdArgs[2],
              });
            }
            break;
          case CONSTANTS.CMD_TURN_LEFT:
            this.onTurnBus(false);
            break;
          case CONSTANTS.CMD_TURN_RIGHT:
            this.onTurnBus(true);
            break;
          case CONSTANTS.CMD_MOVE_FARWARD:
            this.onMoveBus(true);
            break;
          default:
        }
      }, 0);
    });
    // clear the selected bus id after CMDs are finished.
    this.onSwitchBus(null);
  }
  render() {
    return (<section className={'cmd-controller'}>
      <label htmlFor={'cmd-input'}>
        {'Enter CMDs:'}
        <textarea
          id={'cmd-input'}
          onChange={(e) => { this.setState({ cmds: e.target.value }); }}
        />
      </label>
      <button onClick={this.onParseCmds}>{'EXECUTE'}</button>
    </section>);
  }
}

BusCmdController.propTypes = {
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
export { BusCmdController as BusCmdControllerCom };
export default connect(mapStateToProps, mapDispatchToProps)(BusCmdController);
