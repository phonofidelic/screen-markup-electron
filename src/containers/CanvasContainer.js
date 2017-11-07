import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Canvas from '../lib/Canvas';
import FontAwesome from 'react-fontawesome';
import Tools from './Tools';

var canvas;

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		console.log('* CanvasContainer props', props)

		// Initiate canvas
		this.canvas = new Canvas();
		// canvas.init();

		if (window.require) {
			const { ipcRenderer	} = window.require('electron');

			// Listen for save message sent from keyboard shortcut in main process
			ipcRenderer.on('save-img', () => {
				console.log('save-img');
				this.canvas.save();
			})

			ipcRenderer.on('undo', () => { this.canvas.undo() });
		}		
	}

	componentDidMount() {
		// // Initiate canvas
		this.canvas.init();
	}

	render() {
		console.log('*** canvas', this.canvas)
		return (
			<div>
				<div className="canvas-container">
					<canvas id="canvas" />
				</div>
				<div className="tools-container">
					<Tools canvas={this.canvas}/>										 
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
