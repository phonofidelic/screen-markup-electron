import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Canvas from '../lib/canvas';
import FontAwesome from 'react-fontawesome';

const draw = (newState) => {
	console.log('* draw')
	const canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');

	// Clear canvas before drawing new state
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	console.log('* newState', newState)
	newState.forEach(shape => {
		console.log('shape:', shape)
		ctx.strokeStyle = shape.color;
		return ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
	});
}

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		console.log('* CanvasContainer props', props)
	}

	componentDidMount() {
		// Initiate canvas
		// var canvas = document.getElementById('canvas');
		// var ctx = canvas.getContext('2d');
		// ctx.canvas.width = window.innerWidth;
		// ctx.canvas.height = window.innerHeight;

		const canvas = new Canvas();
		console.log('canvas:', canvas)

		document.querySelector('#undo').addEventListener('click', e => {
			canvas.undo();
		})
	}



	// componentDidUpdate() {
	// 	const {canvas} = this.props;
	// 	console.log('@ canvas componrntDidUpdate, canvas:', canvas)

	// 	draw(canvas.canvasShapes);
	// }

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
