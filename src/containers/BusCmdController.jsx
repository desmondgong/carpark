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
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const cmds = e.target.result;
      this.cmdInputDom.value = cmds;
      this.setState({ cmds });
    };
    reader.readAsText(file);
  }

  onParseCmds() {
    const { cmds } = this.state;
    const { onCreateNewBus, onTurnBus, onMoveBus, onSwitchBus } = this.props;
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
    return (<section className={'cmd-controller'}>
      <label htmlFor={'cmd-input'}>
        {'Enter CMDs:'}
        <textarea
          ref={(ele) => { this.cmdInputDom = ele; }}
          id={'cmd-input'}
          onChange={(e) => { this.setState({ cmds: e.target.value }); }}
        />
      </label>
      <button onClick={this.onParseCmds}>{'EXECUTE'}</button>
      <div>
        <label htmlFor="file">{'Choose file to upload'}</label>
        <input onChange={this.onUploadFile} type="file" id="file" />
      </div>
    </section>);
  }
}

BusCmdController.propTypes = {
  onCreateNewBus: PropTypes.func,
  onTurnBus: PropTypes.func,
  onMoveBus: PropTypes.func,
  onSwitchBus: PropTypes.func,
};

export { BusCmdController as BusCmdControllerCom };
export default WithBusController(BusCmdController);
