import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Canvas from '../lib/Canvas';
import FontAwesome from 'react-fontawesome';

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		console.log('* CanvasContainer props', props)
	}

	componentDidMount() {
		// Initiate canvas
		const canvas = new Canvas();
		canvas.init();
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
											 title="Save image" />											 
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
