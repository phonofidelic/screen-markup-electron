import { INIT_CANVAS, SET_COLOR, SELECT_TOOL, ADD_SHAPE, DRAW_SHAPE, UNDO_LAST_DRAW } from '../actiontypes';



export const selectSquare = (tool) => {
	
	return dispatch => {
		dispatch({
			type: SELECT_TOOL,
			payload: tool
		});
	}
};

export const _drawSquare = (ctx, rect, selectedColor) => {
	ctx.strokeStyle = selectedColor;
	ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
	ctx.save();

	console.log('* drawSquare, ctx:', ctx)
};

export const undo = (canvasStates) => {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.restore();
	console.log('* undo, ctx', ctx);
	// Pop last canvas state from the canvasStates array 
	return dispatch => {
		dispatch({
			type: UNDO_LAST_DRAW
		})
	}
}