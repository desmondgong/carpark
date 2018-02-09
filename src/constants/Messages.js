// App description
export const APP_NAME = 'Carpark';
export const APP_DESCRIPTION = 'The application is a simulation of a robot operated bus moving in a carpark, of dimensions 5 units x 5 units. There are no other obstructions in the carpark. The bus is free to roam around the carpark, but must be prevented from exiting the carpark. Any movement that would result in the bus leaving the carpark must be prevented, however further valid movement commands must still be allowed.';
export const CONTROLLER_NAV_PANEL = 'PANEL';
export const CONTROLLER_NAV_CMD = 'COMMAND';
export const APP_BTN_RESTORE = 'RESTORE';
// Messages for BusCMDController
export const BUS_CMD_LABEL_INPUT = 'Enter CMDs:';
export const BUS_CMD_LABEL_UPLOAD = 'Choose file to upload';
export const BUS_CMD_LABEL_EXECUTE = 'EXECUTE';
export const BUS_CMD_LABEL_OUTPUT = 'OUTPUT:';
// Messages for BusPanelController
export const BUS_PANEL_LABEL_POSITION_X = 'POSITION-X:';
export const BUS_PANEL_LABEL_POSITION_Y = 'POSITION-Y:';
export const BUS_PANEL_LABEL_DIRECTION = 'DIRECTION';
export const BUS_PANEL_LABEL_SELECTED = 'SELECTED BUS:';
export const BUS_PANEL_LABEL_PLACE = 'PLACE';
export const BUS_PANEL_LABEL_TURN_LEFT = 'LEFT';
export const BUS_PANEL_LABEL_TURN_RIGHT = 'RIGHT';
export const BUS_PANEL_LABEL_MOVE = 'MOVE';
// Messages for notification
export const NOTIFICATION_OUTSIDE_PARK = 'Target position is outside of park.';
export const NOTIFICATION_UNIT_TAKEN = 'The park unit has been covered by another bus.';
