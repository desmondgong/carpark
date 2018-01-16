import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Bus from './Bus';

const Carpark = ({ buses, selectedBusId, parkSize }) => {
  const parkUnits = [];
  for (let i = 0; i < parkSize * parkSize; i += 1) {
    parkUnits[i] = null;
  }
  buses.forEach((bus) => {
    parkUnits[(bus.posX + ((parkSize - 1 - bus.posY) * parkSize))] = {
      id: bus.id,
      direction: bus.direction,
    };
  });
  return (<section>
    {
      parkUnits.map((parkUnit, i) => {
        let unitClass = classnames('park-unit', (i % parkSize === 0) ? 'boundary' : '');
        if (parkUnit) {
          unitClass = classnames(unitClass, (selectedBusId === parkUnit.id) ? 'selected' : '');
          return (<Bus
            key={i}
            id={parkUnit.id}
            direction={parkUnit.direction}
            className={unitClass}
          />);
        }
        return <div key={i} className={unitClass} />;
      })
    }
  </section>);
};

Carpark.propTypes = {
  buses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    posX: PropTypes.number,
    posY: PropTypes.number,
    direction: PropTypes.string,
  })),
  selectedBusId: PropTypes.string,
  parkSize: PropTypes.number,
};

export default Carpark;
