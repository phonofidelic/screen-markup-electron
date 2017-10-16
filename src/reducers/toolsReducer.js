import { INIT_CANVAS, SET_COLOR, SELECT_SQUARE, UNDO_LAST_DRAW } from '../actiontypes';

const INITIAL_STATE = {
	selectedColor: '#f22a2a',
	selectedTool: null,
	lastDraw: null,
	crop: {
		isSelected: false
	},
	pencil: {
		isSelected: false
	},
	eraser: {
		isSelected: false
	},
	text: {
		isSelected: false
	},
	square: {
		isSelected: false
	}
};

const toolsReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case INIT_CANVAS: {
			return {
				...state,
				canvas: action.canvas
			}
		}

		case SET_COLOR:
			return {
				...state,
			}

		case SELECT_SQUARE: {
			return {
				...state,
				crop: { isSelected: false },
				pencil: { isSelected: false },
				eraser: { isSelected: false },
				text: { isSelected: false },
				square: {isSelected: true}
			}
		}

		default: return state;
	}
}

export default toolsReducer;