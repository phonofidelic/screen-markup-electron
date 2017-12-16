import Shape from './Shape';

const W_OUTER_WIDTH = window.outerWidth;
const W_OUTER_HEIGHT = window.outerHeight + 100;

// Helpers
const setSelectedTool = (tools, selectedTool) => {
	Object.keys(tools).forEach(tool => {
		console.log('tool:', tool)
		if (selectedTool === tool) {
			console.log('selected tool:', tools[tool])
			tools[tool] = true;
		}
	})
}

class CanvasClass {
	constructor() {
		// A list to store data for shapes drawn in the canvas
		this.shapes = [];
		this.tools = {
			rect: false,
			pencil: false,
			text: false,
			eraser: false,
			crop: false
		}
	};

	init() {
		this.canvas = document.getElementById('canvas');
		// this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = W_OUTER_WIDTH;
		this.canvas.height = W_OUTER_HEIGHT;
		// this.ctx.save();

		// Add screenshot to canvas
		this.screenshot = new Image();
		this.screenshot.src = 'screenshot.png';
		this.screenshot.addEventListener('load', e => {
			this.ctx.drawImage(this.screenshot, 0, 0, W_OUTER_WIDTH, W_OUTER_HEIGHT);
		}, false);

		// Activate rectangle tool by default
		this.selectRect();
	}

	undo() {
		if (!this.shapes.length) {
			return console.log('Nothing to undo');
		}
		
		this.ctx.drawImage(this.screenshot, 0, 0, W_OUTER_WIDTH, W_OUTER_HEIGHT);
		this.shapes.pop();
		this.shapes.forEach(shape => {
			shape.draw(this.ctx);
		});
	};

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

	selectRect() {
		setSelectedTool(this.tools, 'rect');

		let mouseIsPressed = false;

		// Holds date to be passed to the Shape constructor
		let shape = {
			x: null,
			y: null,
			width: null,
			height: null,
			color: '#f22a2a'	// TODO: make dynamic
		}

		// Stores data for selection rectangle. Selection rectangle is not 
		// intended to be permanently rendered to the canvas so ther is no
		// need to pass this data to a constructor; it is overwritten on 
		// each mousedown event.
		let selectionData = {
			x: null,
			y: null,
			width: null,
			height: null,
			color: '#ccc'			
		}
		let sel = new Shape(selectionData);
		
		this.canvas.addEventListener('mousedown', e => {
			mouseIsPressed = true;
			shape.x = e.clientX;
			shape.y = e.clientY;

			sel.x = e.clientX;
			sel.y = e.clientY;
		});

		this.canvas.addEventListener('mousemove', (e) => {
			if (mouseIsPressed) {
				sel.width = e.clientX - sel.x;
				sel.height = e.clientY - sel.y;
				sel.strokeStyle = '#ccc';

				this.ctx.strokeStyle = sel.color;
				this.ctx.lineWidth = 3;
				this.ctx.setLineDash([4, 2]);

				// Draw screenshot again
				this.ctx.drawImage(this.screenshot, 0, 0, W_OUTER_WIDTH, W_OUTER_HEIGHT);
				// Draw all shapes in shape list
				this.shapes.forEach(shape => {
					shape.draw(this.ctx);
				});

				sel.draw(this.ctx)
			}
		});

		this.canvas.addEventListener('mouseup', (e) => {
			mouseIsPressed = false;
			shape.width = e.clientX - shape.x;
			shape.height = e.clientY - shape.y;

			this.ctx.strokeStyle = shape.color;
			this.ctx.setLineDash([0, 0]);

			// Add new shape to shapes list
			this.shapes.push(new Shape(shape));

			// Draw screenshot again
			this.ctx.drawImage(this.screenshot, 0, 0, W_OUTER_WIDTH, W_OUTER_HEIGHT);
			// Draw all shapes in shapes list
			this.shapes.forEach(shape => {
				shape.draw(this.ctx);
			});
		});
	}

	selectText() {
		// TODO: implement text tool
	}

	selectEraser() {
		// TODO: implement eraser tool	
	}

	selectPencil() {
		// TODO: implement pencil tool	
	}

	selectCrop() {
		// TODO: implement crop tool	
	}

};

export default CanvasClass;
