import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as CONSTANTS from '../constants';
import * as MESSAGES from '../constants/Messages';
import WithBusController from './WithBusController';
import PlaceSVG from '../resources/img/place.svg';
import TurnLeftSVG from '../resources/img/turnLeft.svg';
import MoveSVG from '../resources/img/move.svg';

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
    return (<div className={'panel-controller container-fluid'} >
      <div className="place-bus row">
        <div className="place-inputs col-8">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">{'X:'}</span>
            </div>
            <input
              type="number"
              className="form-control"
              defaultValue={0}
              onChange={(e) => { this.setState({ posX: parseInt(e.target.value, 10) }); }}
            />
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">{'Y:'}</span>
            </div>
            <input
              type="number"
              className="form-control"
              defaultValue={0}
              onChange={(e) => { this.setState({ posY: parseInt(e.target.value, 10) }); }}
            />
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">{'DIRECTION:'}</span>
            </div>
            <select
              id={'pos-dir'}
              onChange={(e) => { this.setState({ direction: e.target.value }); }}
            >
              {
                CONSTANTS.DIR_ALL.map((dir, i) => <option key={i} value={dir}>{dir}</option>)
              }
            </select>
          </div>
        </div>
        <div className={'place-btn col-4'}>
          <button className={'btn-lg btn-primary'} onClick={() => { onCreateNewBus({ posX, posY, direction }); }}>
            <PlaceSVG />
            {MESSAGES.BUS_PANEL_LABEL_PLACE}
          </button>
        </div>
      </div>

      <div className={'controller row'}>
        <div className="input-group col-8">
          <div className="input-group-prepend">
            <span className="input-group-text">{'Selected Bus:'}</span>
          </div>
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
        </div>
        <div className={'control-btns col-4 container'}>
          <div className={'btn-row row'}>
            <button className={'btn btn-primary'} onClick={() => { onMoveBus(true); }}>
              <MoveSVG transform={'rotate(-90)'} />
              {MESSAGES.BUS_PANEL_LABEL_MOVE}
            </button>
          </div>
          <div className={'btn-row row'}>
            <button className={'btn btn-primary'} onClick={() => { onTurnBus(false); }}>
              <TurnLeftSVG />
              {MESSAGES.BUS_PANEL_LABEL_TURN_LEFT}
            </button>
            <button className={'btn btn-primary'} onClick={() => { onTurnBus(true); }}>
              <TurnLeftSVG transform={'scale(-1, 1)'} />
              {MESSAGES.BUS_PANEL_LABEL_TURN_RIGHT}
            </button>
          </div>
        </div>
      </div>
    </div>);
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
