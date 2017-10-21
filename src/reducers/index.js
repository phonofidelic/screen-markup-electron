import { combineReducers } from 'redux';
import toolsReducer from './toolsReducer';
import canvasReducer from './canvasReducer';

const rootReducer = combineReducers({
	toolsReducer: toolsReducer,
	canvasReducer: canvasReducer
})

export default rootReducer;