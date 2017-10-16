import { combineReducers } from 'redux';
import toolsReducer from './toolsReducer';

const rootReducer = combineReducers({
	toolsReducer: toolsReducer
})

export default rootReducer;