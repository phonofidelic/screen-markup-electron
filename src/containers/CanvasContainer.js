import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Canvas from '../lib/Canvas';
import FontAwesome from 'react-fontawesome';

// Utility function to save edited canvas image to file
// TODO: move to redux action?
const saveCanvas = (canvasEl, filePath) => {
	// Check that we are in an electron environment
	if (window.require) {
		const fs = window.require('fs');
		const canvasBuffer = window.require('electron-canvas-to-buffer');

		console.log('canvas from saveCanvas', canvasEl)
		const buffer = canvasBuffer(canvasEl, 'image/png'); // Throws error: canvs.toDataURL is undefined

		fs.writeFile(`${filePath}.png`, buffer, err => {
			if (err) {
				throw err;
			} else {
				console.log(`Write of ${filePath} was successful`);
			}
		});
	}
}

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		console.log('* CanvasContainer props', props)
	}

	componentDidMount() {
		// Initiate canvas
		const canvas = new Canvas();
		
		document.querySelector('#undo').addEventListener('click', e => {
			canvas.undo();
		});

		console.log('canvas.screenshot from componentDidMount', canvas.screenshot)

		document.querySelector('#save').addEventListener('click', e => {
			canvas.save();
		});
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
											 onClick={this.saveCanvas} />											 
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
