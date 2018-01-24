import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as CONSTANTS from '../constants';
import * as MESSAGES from '../constants/Messages';
import WithBusController from './WithBusController';

/**
 * This container includes some buttons for manually control the carpark.
 */
class BusPanelController extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      posX: 0,
      posY: 0,
      direction: CONSTANTS.DIR_NORTH,
    };
  }

  render() {
    const {
      buses,
      selectedBusId,
      onCreateNewBus,
      onSwitchBus,
      onTurnBus,
      onMoveBus,
     } = this.props;
    const { posX, posY, direction } = this.state;
    return (<section>
      <div>
        <label htmlFor={'pos-x'}>
          {'X:'}
          <input
            id={'pos-x'}
            type="number"
            defaultValue={0}
            onChange={(e) => { this.setState({ posX: parseInt(e.target.value, 10) }); }}
          />
        </label>
        <label htmlFor={'pos-y'}>
          {'Y:'}
          <input
            id={'pos-y'}
            type="number"
            defaultValue={0}
            onChange={(e) => { this.setState({ posY: parseInt(e.target.value, 10) }); }}
          />
        </label>
        <label htmlFor={'pos-dir'}>
          {'DIRECTION:'}
          <select
            id={'pos-dir'}
            onChange={(e) => { this.setState({ direction: e.target.value }); }}
          >
            {
              CONSTANTS.DIR_ALL.map((dir, i) => <option key={i} value={dir}>{dir}</option>)
            }
          </select>
        </label>
        <button onClick={() => { onCreateNewBus({ posX, posY, direction }); }}>
          {MESSAGES.BUS_PANEL_LABEL_PLACE}
        </button>
      </div>

      <div className={'controller'}>
        <label htmlFor={'selected-bus'}>
          {'Selected Bus:'}
          <select
            id={'selected-bus'}
            defaultValue={selectedBusId}
            onChange={(e) => { onSwitchBus(e.target.value); }}
          >
            {
              buses.map((bus, i) => <option
                key={i}
                selected={bus.id === selectedBusId}
                value={bus.id}
              >
                {bus.id}
              </option>)
            }
          </select>
        </label>
        <button onClick={() => { onTurnBus(false); }}>{MESSAGES.BUS_PANEL_LABEL_TURN_LEFT}</button>
        <button onClick={() => { onTurnBus(true); }}>{MESSAGES.BUS_PANEL_LABEL_TURN_RIGHT}</button>
        <button onClick={() => { onMoveBus(true); }}>{MESSAGES.BUS_PANEL_LABEL_MOVE}</button>
      </div>
    </section>);
  }
}

BusPanelController.propTypes = {
  buses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    posX: PropTypes.number,
    posY: PropTypes.number,
    direction: PropTypes.string,
  })),
  selectedBusId: PropTypes.string,
  onCreateNewBus: PropTypes.func,
  onTurnBus: PropTypes.func,
  onMoveBus: PropTypes.func,
  onSwitchBus: PropTypes.func,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  buses: state.buses,
  selectedBusId: state.selectedBusId,
});

export { BusPanelController as BusPanelControllerCom };
export default WithBusController(BusPanelController, mapStateToProps);
