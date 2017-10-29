import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Canvas from '../lib/canvas';
import FontAwesome from 'react-fontawesome';

// import {ipcRenderer} from 'electron';

// Check that we are in an electron environment
if (window.require) {
	const ipcRenderer = window.require('electron').ipcRenderer;
	console.log('ipcRenderer', ipcRenderer)

	var canvasBuffer = window.require('electron-canvas-to-buffer');
	var fs = window.require('fs');
}

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		console.log('* CanvasContainer props', props)
	}

	componentDidMount() {
		// Initiate canvas
		// const canvas = new Canvas();
		// console.log('canvas:', canvas);

		// document.querySelector('#undo').addEventListener('click', e => {
		// 	canvas.undo();
		// });

		// document.querySelector('#save').addEventListener('click', e => {
		// 	if (window.require) {
		// 		const ipcRenderer = window.require('electron').ipcRenderer;
		// 		ipcRenderer.send('save-img', canvas)
		// 	}
		// })
	}

	saveImg() {
		const canvas = document.querySelector('#canvas');
		// console.log('canvas from saveImg', canvas); // <-- canvas html element
		if (window.require) {
			const ipcRenderer = window.require('electron').ipcRenderer;
			ipcRenderer.send('save-img', canvas)
		}
	}

	render() {
		return (
			<div>
				<div className="canvas-container">
					<canvas id="canvas" />				
				</div>
				<div className="tools-container">
					<FontAwesome name='undo'
											 id="undo"
											 className="tool"
											 title="Undo" />

					<FontAwesome name='floppy-o'
											 id="save"
											 className="tool"
											 title="Save image"
											 onClick={this.saveImg} />											 
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
  	canvas: state.canvasReducer,
    tools: state.toolsReducer
  }
}

export default connect(mapStateToProps, actions)(CanvasContainer);
