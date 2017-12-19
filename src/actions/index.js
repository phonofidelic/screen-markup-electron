import { 
	SELECT_TOOL,
	TOGGLE_TOOLS
} from '../actiontypes';

import { Rectangle, Brush, Text, Eraser, Crop } from '../lib/Tools';

const toolConstructors = {
	'rectangle': new Rectangle(),
	'brush': new Brush(),
	'eraser': new Eraser()
}

export const toggleTools = () => {
	return dispatch => {
		dispatch({
			type: TOGGLE_TOOLS
		})
	}
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
