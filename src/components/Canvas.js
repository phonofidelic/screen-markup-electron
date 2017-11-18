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

		if (window.require) {
			const { ipcRenderer	} = window.require('electron');

			// Listen for save message sent from keyboard shortcut in main process
			ipcRenderer.on('save-img', () => {
				console.log('save-img');
				this.save();
			})

			ipcRenderer.on('undo', () => { this.undo() });
		}	
	}

	undo() {
		if (!this.shapeList.length) {
			return console.log('Nothing to undo');
		}
		
		this.ctx.drawImage(this.screenshot, 0, 0, this.canvas.width, this.canvas.height);

		this.shapeList.pop();

		this.shapeList.forEach(shape => {
			shape.draw(this.ctx);
		});
	}

	save() {
		if (window.require) {
			const { dialog } = window.require('electron').remote;
			const fs = window.require('fs');
			const canvasBuffer = window.require('electron-canvas-to-buffer');

			dialog.showSaveDialog(filePath => {
				const buffer = canvasBuffer(this.canvas, 'image/png');

				fs.writeFile(`${filePath}.png`, buffer, err => {
					if (err) {
						throw err;
					} else {
						console.log(`Write of ${filePath} was successful`);
					}
				});
			});
		}
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
