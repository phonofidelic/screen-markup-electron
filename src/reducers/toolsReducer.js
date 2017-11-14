import { INIT_CANVAS, SET_COLOR, SELECT_TOOL } from '../actiontypes';

const INITIAL_STATE = {
	selectedColor: '#f22a2a',
	selectedTool: 'no_tool',
};

const toolsReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {


		case SET_COLOR:
			return {
				...state,
			}

		case SELECT_TOOL: 
			return {
				...state,
				selectedTool: action.payload
			}



		default: return state;
	}
}

export default toolsReducer;