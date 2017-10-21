import { INIT_CANVAS, ADD_SHAPE, DRAW_SHAPE, UNDO_LAST_DRAW } from '../actiontypes';

const INITIAL_STATE = {
	canvasShapes: []
};

/*
		IDEA: Create objects with enough data to represent the 
		canvas shapes to be drawn and keep track of them
		in the canvas reducer. These data objects are not
		the actual canvas ctx, but are passed to a function
		that draws to the canvas using that data. 
*/
const canvasReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {

		/*
				BUG: All items in the canvasShapes array are being overwritten
				with the action.lastDraw item each time a new item is added 
				resulting in an array of identical items. We seem to only see 
				one shape in the canvas but there are actually all shapes in the 
				array rendered on top of each other.
		*/
		case ADD_SHAPE:
			return {
				...state,
				canvasShapes: [...state.canvasShapes, action.lastDraw]
			}

		case DRAW_SHAPE:
			return {
				...state
			}

		case UNDO_LAST_DRAW:
			// Coppy all but the latest ctx state from the canvasShapes array
			const undoLastDraw = state.canvasShapes;
			undoLastDraw.pop();
			console.log('@undoLastDraw:', undoLastDraw)
			return {
				...state,
				canvasShapes: undoLastDraw
			}

		default: return state;
	}
};

export default canvasReducer;