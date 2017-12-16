import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const inspector = window.window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer, inspector);

// const { remote } = window.require('electron');
// const screenCapBuffer = window.require('screenshot-desktop');

// screenCapBuffer().then(imageBuffer => {
// 	// BUG: In dist, imageBuffer returns undefined
// 	// const imageBuffer = remote.getGlobal('imageBuffer');
// 	console.log('imageBuffer', imageBuffer);

// 	const u8array = new Uint8Array(imageBuffer);
// 	console.log('u8array', u8array);

// 	const blob = new Blob([ imageBuffer ], { type: "image/png" });
// 	const url = URL.createObjectURL(blob);

// 	let screenshot = new Image();
// 	screenshot.src = url;

// 	console.log('screenshot', screenshot);

// 	ReactDOM.render(
// 		<Provider store={store}>
// 			<App screenshot={screenshot} />
// 		</Provider>, document.getElementById('root'));

	
// }).catch(err => {
// 	console.error('screenCapBuffer error:', err);
// });


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));
// registerServiceWorker();
