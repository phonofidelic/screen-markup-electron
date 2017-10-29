import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Canvas from './lib/canvas';

const inspector = window.window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer, inspector);

// ReactDOM.render(
// 	<Provider store={store}>
// 		<App />
// 	</Provider>, document.getElementById('root'));
// registerServiceWorker();

// Try creating app outside of React
if (window.require) {

	const canvasBuffer = window.require('electron-canvas-to-buffer');
	const fs = window.require('fs');
	const ipcRenderer = window.require('electron').ipcRenderer;
	const { dialog } = window.require('electron').remote;

	// TODO: find a better name for the camera instanse
	const c = new Canvas(); 

	const saveCanvas = (canvas, filePath) => {
		// TODO: encapsulate in function
		console.log('save', canvas);

		const buffer = canvasBuffer(canvas, 'image/png');
		console.log('buffer', buffer)

		fs.writeFile(filePath, buffer, err => {
			if (err) {
				throw err;
			} else {
				console.log('Write of','canvas-img-test.png','was successful');
			}
		});
	};

	// Build html
	const app = document.createElement('div');
	const canvasContainer = document.createElement('div');
	const toolsContainer = document.createElement('div');
	canvasContainer.classList.add('canvas-container');
	toolsContainer.classList.add('tools-container');

	let tools = [];

	// Tool components
	const save = document.createElement('span');
	save.classList.add('tool', 'fa', 'fa-floppy-o');
	save.addEventListener('click', e => { 
		dialog.showSaveDialog(filePath => {
			saveCanvas(c.canvas, filePath);
		});
	});

	const undo = document.createElement('span');
	undo.classList.add('tool', 'fa', 'fa-undo');
	undo.addEventListener('click', e => {
		// BUG: canvas is in broken state
		// canvas.undo();
	});

	tools.push(undo, save);

	tools.forEach(tool => {
		toolsContainer.appendChild(tool);
	});

	// console.log('check canvas screenshot:', c.screenshot.src)

	document.body.appendChild(app);
	app.appendChild(canvasContainer);
	app.appendChild(toolsContainer);
	canvasContainer.appendChild(c.canvas);
};