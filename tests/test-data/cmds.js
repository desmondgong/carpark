import * as CONSTANTS from '../../src/constants';

const cmds = {
  CMD_CORRECT: `place 0,0,${CONSTANTS.DIR_NORTH}\nmove\nright\nleft\nreport`,
  CMD_ERROR_INCORRECT_FORMAT: `place 0,${CONSTANTS.DIR_NORTH}\nmove\nright\nleft\nreport`,
};

export default cmds;
