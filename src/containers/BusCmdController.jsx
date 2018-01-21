import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import WithBusController from './WithBusController';
import * as CONSTANTS from '../constants';

class BusCmdController extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cmds: '',
    };
    this.onUploadFile = this.onUploadFile.bind(this);
    this.onParseCmds = this.onParseCmds.bind(this);
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
    const { onCreateNewBus, onTurnBus, onMoveBus, onSwitchBus, onReportPos } = this.props;
    // clear report before new cmds are executed.
    setTimeout(() => {
      onReportPos(true);
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
              onCreateNewBus({
                posX: parseInt(cmdArgs[0], 10),
                posY: parseInt(cmdArgs[1], 10),
                direction: cmdArgs[2],
              });
            }
            break;
          case CONSTANTS.CMD_TURN_LEFT:
            onTurnBus(false);
            break;
          case CONSTANTS.CMD_TURN_RIGHT:
            onTurnBus(true);
            break;
          case CONSTANTS.CMD_MOVE_FARWARD:
            onMoveBus(true);
            break;
          case CONSTANTS.CMD_REPORT:
            onReportPos();
            break;
          default:
        }
      }, 0);
    });
    // clear the selected bus id after CMDs are finished.
    setTimeout(() => {
      onSwitchBus(null);
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
  report: PropTypes.string,
  onCreateNewBus: PropTypes.func,
  onTurnBus: PropTypes.func,
  onMoveBus: PropTypes.func,
  onSwitchBus: PropTypes.func,
  onReportPos: PropTypes.func,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  report: state.report,
});

export { BusCmdController as BusCmdControllerCom };
export default WithBusController(BusCmdController, mapStateToProps);
