import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Carpark from '../components/Carpark';
import BusPanelController from './BusPanelController';
import BusCmdController from './BusCmdController';
import * as CONSTANTS from '../constants';
import * as MESSAGES from '../constants/Messages';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: CONSTANTS.TAB_PANEL,
    };
  }

  render() {
    const { buses, selectedBusId, parkSize, notification } = this.props;
    const { activeTab } = this.state;
    const tabPanelClass = classnames('nav-link', (activeTab === CONSTANTS.TAB_PANEL) ? 'active' : '');
    const tabCmdClass = classnames('nav-link', (activeTab === CONSTANTS.TAB_CMD) ? 'active' : '');
    return (<div className={'main-content container'}>
      <div className={'app-header'}>
        <h1>{MESSAGES.APP_NAME}</h1>
        <div className={'app-desc'}>{MESSAGES.APP_DESCRIPTION}</div>
      </div>
      <div className={'row'}>
        <section className={'col-6 container'}>
          <div className={'row'}>
            <Carpark buses={buses} selectedBusId={selectedBusId} parkSize={parkSize} containerClass={'offset-2'} />
          </div>
          <div className={'row'}>
            { notification ? <section className={'alert alert-warning offset-2'} role="alert">{notification}</section> : null }
          </div>
        </section>
        <section className={'col-6 controllers'}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                href=""
                className={tabPanelClass}
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ activeTab: CONSTANTS.TAB_PANEL });
                }}
              >
                {MESSAGES.CONTROLLER_NAV_PANEL}
              </a>
            </li>
            <li className="nav-item">
              <a
                href=""
                className={tabCmdClass}
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ activeTab: CONSTANTS.TAB_CMD });
                }}
              >
                {MESSAGES.CONTROLLER_NAV_CMD}
              </a>
            </li>
          </ul>
          {(activeTab === CONSTANTS.TAB_PANEL) ? <BusPanelController /> : <BusCmdController />}
        </section>
      </div>
    </div>);
  }
}

App.propTypes = {
  buses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    posX: PropTypes.number,
    posY: PropTypes.number,
    direction: PropTypes.string,
  })),
  selectedBusId: PropTypes.string,
  parkSize: PropTypes.number,
  notification: PropTypes.string,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  buses: state.buses,
  selectedBusId: state.selectedBusId,
  parkSize: state.parkSize,
  notification: state.notification,
});

export { App as AppCom };
export default connect(mapStateToProps, null)(App);
