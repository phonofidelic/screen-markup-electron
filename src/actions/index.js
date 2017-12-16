import { 
	INIT_CANVAS, 
	SET_COLOR, 
	SELECT_TOOL, 
	ADD_SHAPE, 
	DRAW_SHAPE, 
	UNDO_LAST_DRAW 
} from '../actiontypes';

import { Rectangle, Brush, Text, Eraser, Crop } from '../lib/Tools';

const toolConstructors = {
	'rectangle': new Rectangle(),
	'brush': new Brush()
}

export const selectTool = (tooltype) => {
	return dispatch => {
		dispatch({
			type: SELECT_TOOL,
			payload: toolConstructors[tooltype]
		});
	}
};

export const selectRectangle = () => {
	return dispatch => {
		dispatch({
			type: SELECT_TOOL,
			payload: toolConstructors['rectangle']
		});
	}
};

export const selectBrush = () => {
	return dispatch => {
		dispatch({
			type: SELECT_TOOL,
			payload: new Brush()
		});
	}
};

export const selectText = () => {
	return dispatch => {
		dispatch({
			type: SELECT_TOOL,
			payload: new Text()
		});
	}
};

export const selectEraser = () => {
	return dispatch => {
		dispatch({
			type: SELECT_TOOL,
			payload: new Eraser()
		});
	}
};

export const selectCrop = () => {
	return dispatch => {
		dispatch({
			type: SELECT_TOOL,
			payload: new Crop()
		});
	}
};
