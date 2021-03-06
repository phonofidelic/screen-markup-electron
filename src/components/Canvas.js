/*
		https://github.com/svrcekmichal/react-sketchpad/blob/master/src/SketchPad.jsx
*/
import React, { Component } from 'react';
// import Shape from '../lib/Shape';
// import Rectangle from '../lib/Rectangle';
// import { Rectangle, Brush, Arrow, Text, Eraser, Crop } from '../lib/Tools';

class Canvas extends Component {
	constructor(props) {
		console.log('Canvas props:', props)
		super(props);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.mouseIsDown = false;
		this.shapeList = [];
	}

	componentDidMount() {
		this.canvas = this.canvasRef;
		console.log('Canvas, this.canvas:', this.canvas)

		this.ctx = this.canvas.getContext('2d');

		// Load and render captured screen image
		if (window.require) {
			const { remote, ipcRenderer } = window.require('electron');

			const imageBuffer = remote.getGlobal('imageBuffer');			
			const blob = new Blob([ imageBuffer ], { type: "image/png" });
			const url = URL.createObjectURL(blob);

			this.screenshot = new Image();
			this.screenshot.src = url;

			this.screenshot.addEventListener('load', () => {
				console.log('IMAGE LOADED')
				this.drawScreenshot(this.ctx, this.screenshot);
			});

			// Listen for user actions from keyboard shortcuts in main process
			ipcRenderer.on('save-img', () => { this.save(); });
			ipcRenderer.on('undo', () => { this.undo(); });

			// Listen for logger messages from main process
			ipcRenderer.on('logger-messages', (e, logs) => {
				// logs.forEach(log => {
				// 	console.log(log.description, log.value);
				// })
			})
			// Let main process know when component has mounted
			ipcRenderer.send('canvas-did-mount');
		}
	}

	drawScreenshot(ctx, screenshot) {
		// console.log('drawScreenshot called')
		ctx.drawImage(screenshot, 0, 0, window.screen.width, window.screen.height);
	}

	undo() {
		if (!this.shapeList.length) {
			return console.log('Nothing to undo');
		}
		
		this.drawScreenshot(this.ctx, this.screenshot);
		this.shapeList.pop();
		this.shapeList.forEach(shape => {
			shape.draw(this.ctx);
		});
	}

	save() {
		if (window.require) {
			const fs = window.require('fs');
			const exec = window.require('child_process').exec;
			const { remote, ipcRenderer } = window.require('electron');
			const dialog = remote.dialog;
			const win = remote.getCurrentWindow();
			const canvasBuffer = window.require('electron-canvas-to-buffer');

			const saveFile = new Promise((resolve, reject) => {
				const savePath = dialog.showSaveDialog();
				const buffer = canvasBuffer(this.canvas, 'image/png');

				fs.writeFile(`${savePath}.png`, buffer, err => {
					if (err) {
						reject(err);
					} else {
						resolve(savePath);
					}
				})
			});

			saveFile.then(savePath => {
				if (!savePath) {
					return console.log('Save canceled');
				}
				savePath = savePath.slice(0, savePath.lastIndexOf('/'));
				exec(`open ${savePath}`);
				win.close();
			}).catch(err => {
				console.error('saveFile error:', err)
			});
		}
	}

	handleMouseDown(e) {
		this.mouseIsDown = true;

		// Draw screenshot again
		this.drawScreenshot(this.ctx, this.screenshot);

		if (!this.props.tool.mouseDown) {
			return console.log('no Rectangle mouseDown')
		} 
		this.props.tool.mouseDown(e, this.ctx, this.shapeList);
	}

	handleMouseMove(e) {
		if (this.mouseIsDown) {
			// Draw screenshot again
			this.drawScreenshot(this.ctx, this.screenshot);

			if (!this.props.tool.mouseMove) {
				return console.log('no Rectangle mouseMove')
			}
			this.props.tool.mouseMove(e, this.ctx, this.shapeList);
		}
	}

	handleMouseUp(e) {
		this.mouseIsDown = false;

		// Draw screenshot again
		this.drawScreenshot(this.ctx, this.screenshot);

		if(!this.props.tool.mouseUp) {
			return console.log('no tool mouseUp')
		}
		this.shapeList = this.props.tool.mouseUp(e, this.ctx, this.shapeList)
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
