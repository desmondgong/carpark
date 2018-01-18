import * as CONSTANTS from '../../src/constants';

const cmds = [{
  comment: 'one bus with all correct cmds',
  cmd: `place 0,0,${CONSTANTS.DIR_NORTH}\nmove\nright\nleft\nreport`,
  buses: [{ posX: 0, posY: 1, direction: CONSTANTS.DIR_NORTH }],
  report: `0,1,${CONSTANTS.DIR_NORTH}`,
}, {
  comment: 'one bus with some move outside cmds',
  cmd: `place 0,0,${CONSTANTS.DIR_NORTH}\nmove\nleft\nmove\nright\nmove\nreport`,
  buses: [{ posX: 0, posY: 2, direction: CONSTANTS.DIR_NORTH }],
  report: `0,2,${CONSTANTS.DIR_NORTH}`,
}, {
  comment: 'one bus with outside place',
  cmd: `place 0,100,${CONSTANTS.DIR_NORTH}\nmove\nleft\nmove\nplace 2,2,${CONSTANTS.DIR_SOUTH}\nright\nmove\nreport`,
  buses: [{ posX: 1, posY: 2, direction: CONSTANTS.DIR_WEST }],
  report: `1,2,${CONSTANTS.DIR_WEST}`,
}, {
  comment: 'one bus with error cmds',
  cmd: `place 0,1,top\nmove\nleft\nplace 2,${CONSTANTS.DIR_SOUTH}\nright\nmove\nplace 2,2,${CONSTANTS.DIR_SOUTH}\nreport`,
  buses: [{ posX: 2, posY: 2, direction: CONSTANTS.DIR_SOUTH }],
  report: `2,2,${CONSTANTS.DIR_SOUTH}`,
}, {
  comment: '2 bus with correct cmds',
  cmd: `place 0,1,${CONSTANTS.DIR_NORTH}\nmove\nleft\nplace 2,2,${CONSTANTS.DIR_SOUTH}\nreport`,
  buses: [
    { posX: 0, posY: 2, direction: CONSTANTS.DIR_NORTH },
    { posX: 2, posY: 2, direction: CONSTANTS.DIR_SOUTH },
  ],
  report: `2,2,${CONSTANTS.DIR_SOUTH}`,
}, {
  comment: '2 bus with collision cmds',
  cmd: `place 0,1,${CONSTANTS.DIR_NORTH}\nmove\nleft\nplace 2,2,${CONSTANTS.DIR_WEST}\nmove\nmove\nright\nmove\nreport`,
  buses: [
    { posX: 0, posY: 2, direction: CONSTANTS.DIR_NORTH },
    { posX: 1, posY: 3, direction: CONSTANTS.DIR_NORTH },
  ],
  report: `1,3,${CONSTANTS.DIR_NORTH}`,
}];

export default cmds;
