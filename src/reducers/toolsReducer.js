import { SET_COLOR, SELECT_TOOL, TOGGLE_TOOLS } from '../actiontypes';

const INITIAL_STATE = {
	selectedColor: '#f22a2a',
	selectedTool: 'no_tool',
	toolsList: [
		{
			faName: 'square-o',
			title: 'Rectangle [R]',
			tooltype: 'rectangle'
		},
		{
			faName: 'paint-brush',
			title: 'Brush [B]',
			tooltype: 'brush'
		}
	],
	showTools: false
};

const toolsReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case TOGGLE_TOOLS:
			return {
				...state,
				showTools: !state.showTools
			}

		case SET_COLOR:
			return {
				...state,
			}

		case SELECT_TOOL: 
			return {
				...state,
				selectedTool: action.payload,
				showTools: false
			}

		default: return state;
	}
}

export default toolsReducer;