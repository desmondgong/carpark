import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import WithBusController from './WithBusController';
import * as CONSTANTS from '../constants';
import * as MESSAGES from '../constants/Messages';

class BusCmdController extends PureComponent {
  /* Be carefull to use PureComponent, as it only do shadow comparison for
  * state and props, if they are in hierarchy, we should abonden it.
  */
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
    let cmdsPromise = Promise.resolve(onReportPos(true));
    // clear report before new cmds are executed.
    const { cmds } = this.state;
    const cmdArray = cmds.toUpperCase().split('\n');
    cmdArray.forEach((cmd) => {
      // set then() here to execute until the last cmd is finished.
      cmdsPromise = cmdsPromise.then(() => {
        const cmdKeys = cmd.split(' ');
        const cmdType = cmdKeys[0];
        const cmdArgs = cmdKeys[1] ? cmdKeys[1].split(',') : [];
        switch (cmdType) {
          case CONSTANTS.CMD_PLACE:
            if (cmdArgs.length > 2) {
              return onCreateNewBus({
                posX: parseInt(cmdArgs[0], 10),
                posY: parseInt(cmdArgs[1], 10),
                direction: cmdArgs[2],
              });
            }
            return Promise.resolve();
          case CONSTANTS.CMD_TURN_LEFT:
            return onTurnBus(false);
          case CONSTANTS.CMD_TURN_RIGHT:
            return onTurnBus(true);
          case CONSTANTS.CMD_MOVE_FARWARD:
            return onMoveBus(true);
          case CONSTANTS.CMD_REPORT:
            return onReportPos();
          default:
            return Promise.resolve();
        }
      });
    });
    // clear the selected bus id after CMDs are finished.
    cmdsPromise.then(() => onSwitchBus(null));
  }
  render() {
    const { report } = this.props;
    return (<section className={'cmd-controller'}>
      <div>
        <label htmlFor={'cmd-input'}>{MESSAGES.BUS_CMD_LABEL_INPUT}</label>
      </div>
      <div>
        <textarea
          ref={(ele) => { this.cmdInputDom = ele; }}
          id={'cmd-input'}
          onChange={(e) => { this.setState({ cmds: e.target.value }); }}
        />
      </div>
      <div>
        <label htmlFor="file">{MESSAGES.BUS_CMD_LABEL_UPLOAD}</label>
        <input
          ref={(ele) => { this.fileUploadDom = ele; }}
          onChange={this.onUploadFile}
          type="file"
          id="file"
        />
      </div>
      <div>
        <button id="cmd-exec" onClick={this.onParseCmds}>{MESSAGES.BUS_CMD_LABEL_EXECUTE}</button>
      </div>
      <div>
        <label htmlFor="report">{MESSAGES.BUS_CMD_LABEL_OUTPUT}</label>
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
