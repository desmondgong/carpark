import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as CONSTANTS from '../constants';
import { placeBus, selectBus } from '../actions';
import * as Utils from '../utils';

class BusCab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      posX: 0,
      posY: 0,
      direction: CONSTANTS.DIR_NORTH,
    };
    this.onCreateNewBus = this.onCreateNewBus.bind(this);
    this.onTurnBus = this.onTurnBus.bind(this);
    this.onSwitchBus = this.onSwitchBus.bind(this);
  }

  onCreateNewBus() {
    const { posX, posY, direction } = this.state;
    const { changeBusPos } = this.props;
    changeBusPos({ posX, posY, direction });
  }

  onTurnBus(isClockwise) {
    const { buses, selectedBusId, changeBusPos } = this.props;
    const selectedBus = buses.find(bus => bus.id === selectedBusId);
    changeBusPos({
      posX: selectedBus.posX,
      posY: selectedBus.posY,
      direction: Utils.rotateBus(selectedBus.direction, isClockwise),
    }, selectedBusId);
  }

  onMoveBus(isForward) {
    const { buses, selectedBusId, changeBusPos } = this.props;
    const selectedBus = buses.find(bus => bus.id === selectedBusId);
    changeBusPos(Utils.moveBus(selectedBus, isForward), selectedBusId);
  }

  onSwitchBus(busId) {
    const { switchBus } = this.props;
    switchBus(busId);
  }

  render() {
    const { buses, selectedBusId } = this.props;
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
        <button onClick={() => { this.onCreateNewBus(); }}>{'PLACE'}</button>
      </div>

      <div className={'controller'}>
        <label htmlFor={'selected-bus'}>
          {'Selected Bus:'}
          <select
            id={'selected-bus'}
            defaultValue={selectedBusId}
            onChange={(e) => { this.onSwitchBus(e.target.value); }}
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
        <button onClick={() => { this.onTurnBus(false); }}>{'LEFT'}</button>
        <button onClick={() => { this.onTurnBus(true); }}>{'RIGHT'}</button>
        <button onClick={() => { this.onMoveBus(true); }}>{'MOVE'}</button>
        <button>{'REPORT'}</button>
      </div>
    </section>);
  }
}

BusCab.propTypes = {
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
export { BusCab as BusCabCom };
export default connect(mapStateToProps, mapDispatchToProps)(BusCab);
