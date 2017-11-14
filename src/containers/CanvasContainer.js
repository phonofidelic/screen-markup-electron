import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CanvasClass from '../lib/Canvas';
import FontAwesome from 'react-fontawesome';
import Canvas from '../components/Canvas';
import Tools from './Tools';

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		console.log('* CanvasContainer props', props)

		this.canvas = new CanvasClass();

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
		// Initiate canvas
		this.canvas.init();
	}

	render() {
		console.log('*** canvas', this.canvas)
		const { selectedTool } = this.props.tools;
		return (
			<div>
				<div className="canvas-container">
					<Canvas width={window.outerWidth} 
									height={window.outerHeight}
									tool={selectedTool} />
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
    tools: state.toolsReducer
  }
}

export default connect(mapStateToProps, actions)(CanvasContainer);
