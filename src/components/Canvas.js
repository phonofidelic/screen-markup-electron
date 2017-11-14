/*
		https://github.com/svrcekmichal/react-sketchpad/blob/master/src/SketchPad.jsx
*/
import React, { Component } from 'react';
import Shape from '../lib/Shape';
// import Rectangle from '../lib/Rectangle';
import { Rectangle, Brush, Text, Eraser, Crop } from '../lib/Tools';

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.tools = {
			rectangle: new Rectangle(),
			bruh: new Brush(),
			text: new Text(),
			eraser: new Eraser(),
			crop: new Crop()
		};
		this.mouseIsDown = false;
		this.shapeList = [];
	}

	componentDidMount() {
		this.canvas = this.canvasRef;
		console.log('this.canvas', this.canvas)

		this.ctx = this.canvas.getContext('2d');

		// Load and render captured screen image
		this.screenshot = new Image();
		this.screenshot.src = 'screenshot.png';
		this.screenshot.addEventListener('load', e => {
			this.ctx.drawImage(this.screenshot, 0, 0, this.canvas.width, this.canvas.height);
		}, false);
	}

	handleMouseDown(e) {
		console.log('handleMouseDown, tool', this.props.tool);

		this.mouseIsDown = true;

		// Draw screenshot again
		this.ctx.drawImage(this.screenshot, 0, 0, this.canvas.width, this.canvas.height);

		if (!this.props.tool.mouseDown) {
			return console.log('no Rectangle mouseDown')
		} 
		this.props.tool.mouseDown(e, this.ctx, this.shapeList);
	}

	handleMouseMove(e) {
		if (this.mouseIsDown) {
			// Draw screenshot again
			this.ctx.drawImage(this.screenshot, 0, 0, this.canvas.width, this.canvas.height);

			if (!this.props.tool.mouseMove) {
				return console.log('no Rectangle mouseMove')
			}
			this.props.tool.mouseMove(e, this.ctx, this.shapeList);
		}
	}

	handleMouseUp(e) {
		console.log('handleMouseUp');
		this.mouseIsDown = false;

		// Draw screenshot again
		this.ctx.drawImage(this.screenshot, 0, 0, this.canvas.width, this.canvas.height);

		if(!this.props.tool.mouseUp) {
			return console.log('no tool mouseUp')
		}
		this.shapeList = this.props.tool.mouseUp(e, this.ctx, this.shapeList)

		console.log('Canvas this.shapeList:', this.shapeList)
	}

	render() {
		const { width, height } = this.props;
		return (
			<canvas ref={canvas => { this.canvasRef = canvas; }}
							id="canvas"
							className="canvas"
							width={width}
							height={height} 
							onMouseDown={this.handleMouseDown /* this.selectedTool.mouseDown */}
							onMouseMove={this.handleMouseMove}
							onMouseUp={this.handleMouseUp} />
		)
	}
}

export default Canvas;
