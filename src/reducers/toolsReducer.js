import { SET_COLOR, SELECT_TOOL, TOGGLE_TOOLS } from '../actiontypes';

const INITIAL_STATE = {
	selectedColor: '#f22a2a',
	selectedTool: 'rectangle',
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
		},
		{
			faName: 'mouse-pointer',
			title: 'Arrow [A]',
			tooltype: 'arrow'
		}
		// {
		// 	faName: 'eraser',
		// 	title: 'Eraser [E]',
		// 	tooltype: 'eraser'
		// },
		// {
		// 	faName: 'undo',
		// 	title: 'Undo [Cmd+Z]',
		// 	tooltype: 'undo'
		// }
	],
	showTools: false,
	rectangleData: {
		strokeStyle: '#ccc',
		lineWidth: 3,
		lineDash: [4, 2]	
	}
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