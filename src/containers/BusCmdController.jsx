import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { placeBus, selectBus, setReport } from '../actions';
import * as Utils from '../utils';
import * as CONSTANTS from '../constants';

class BusCmdController extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cmds: '',
    };
    this.onCreateNewBus = this.onCreateNewBus.bind(this);
    this.onTurnBus = this.onTurnBus.bind(this);
    this.onMoveBus = this.onMoveBus.bind(this);
    this.onSwitchBus = this.onSwitchBus.bind(this);
    this.onReportPos = this.onReportPos.bind(this);
    this.onUploadFile = this.onUploadFile.bind(this);
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

  onReportPos(isClearMsg) {
    const { buses, selectedBusId, changeReport } = this.props;
    if (isClearMsg) {
      changeReport('');
    } else {
      const selectedBus = buses.find(bus => bus.id === selectedBusId);
      if (selectedBus) {
        const currentPosMsg = `${selectedBus.posX},${selectedBus.posY},${selectedBus.direction}`;
        changeReport(currentPosMsg);
      }
    }
  }

  onUploadFile(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const cmds = e.target.result;
        this.cmdInputDom.value = cmds;
        this.setState({ cmds });
        this.fileUploadDom.value = '';
      };
      reader.readAsText(file);
    }
  }

  onParseCmds() {
    // clear report before new cmds are executed.
    setTimeout(() => {
      this.onReportPos(true);
    }, 0);
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
          case CONSTANTS.CMD_REPORT:
            this.onReportPos();
            break;
          default:
        }
      }, 0);
    });
    // clear the selected bus id after CMDs are finished.
    setTimeout(() => {
      this.onSwitchBus(null);
    }, 0);
  }
  render() {
    const { report } = this.props;
    return (<section className={'cmd-controller'}>
      <div>
        <label htmlFor={'cmd-input'}>{'Enter CMDs:'}</label>
      </div>
      <div>
        <textarea
          ref={(ele) => { this.cmdInputDom = ele; }}
          id={'cmd-input'}
          onChange={(e) => { this.setState({ cmds: e.target.value }); }}
        />
      </div>
      <div>
        <label htmlFor="file">{'Choose file to upload'}</label>
        <input
          ref={(ele) => { this.fileUploadDom = ele; }}
          onChange={this.onUploadFile}
          type="file"
          id="file"
        />
      </div>
      <div>
        <button id="cmd-exec" onClick={this.onParseCmds}>{'EXECUTE'}</button>
      </div>
      <div>
        <label htmlFor="report">{'Output: '}</label>
        <span id="report">{report}</span>
      </div>
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
  report: PropTypes.string,
  changeBusPos: PropTypes.func,
  switchBus: PropTypes.func,
  changeReport: PropTypes.func,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  buses: state.buses,
  selectedBusId: state.selectedBusId,
  report: state.report,
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  changeBusPos(position, busId) {
    dispatch(placeBus(position, busId));
  },
  switchBus(busId) {
    dispatch(selectBus(busId));
  },
  changeReport(message) {
    dispatch(setReport(message));
  },
});

export { BusCmdController as BusCmdControllerCom };
export default connect(mapStateToProps, mapDispatchToProps)(BusCmdController);
