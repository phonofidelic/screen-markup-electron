import Shape from './shape';
console.log('Shape', Shape)

const W_OUTER_WIDTH = window.outerWidth;
const W_OUTER_HEIGHT = window.outerHeight + 100;
class Canvas {
	constructor() {
		// A list to store data for shapes drawn in the canvas
		this.shapes = [];
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
			console.log('image loaded', this.screenshot)
			this.ctx.drawImage(this.screenshot, 0, 0, W_OUTER_WIDTH, W_OUTER_HEIGHT);
		}, false);

		let mouseIsPressed = false;
		let shape = {
			x: null,
			y: null,
			width: null,
			height: null,
			color: '#f22a2a'	// TODO: make dynamic
		}

		this.sel = {
			x: null,
			y: null,
			width: null,
			height: null,
			color: '#ccc'			
		}
		
		this.canvas.addEventListener('mousedown', e => {
			console.log('mousedown canvas')
			mouseIsPressed = true;
			shape.x = e.clientX;
			shape.y = e.clientY;
			// shape = new Shape(e.clientX, e.clientY, false, false);

			this.sel.x = e.clientX;
			this.sel.y = e.clientY;
		});

		this.canvas.addEventListener('mousemove', (e) => {
			if (mouseIsPressed) {
				console.log('mousemove canvas', e)
				// Create new shape outside of current canvas context
				const ctx = this.canvas.getContext('2d'); 
				ctx.strokeStyle = "#ccc";
				ctx.lineWidth = 3;
				ctx.setLineDash([4, 2]);

				// ctx.clearRect(0, 0, W_OUTER_WIDTH, W_OUTER_HEIGHT);
				// Draw screenshot again
				this.ctx.drawImage(this.screenshot, 0, 0, W_OUTER_WIDTH, W_OUTER_HEIGHT);
				// TODO: draw all shapes in shape list
				this.shapes.forEach(shape => {
					console.log('* shape', shape)
					this.ctx.strokeRect(
						shape.x,
						shape.y,
						shape.width,
						shape.height
					);
				});

				ctx.strokeRect(
					this.sel.x,
					this.sel.y,
					e.clientX - this.sel.x,
					e.clientY - this.sel.y
				);
			}
		});

		this.canvas.addEventListener('mouseup', (e) => {
			console.log('mouseup canvas', e)
			mouseIsPressed = false;
			shape.width = e.clientX - shape.x;
			shape.height = e.clientY - shape.y;

			this.ctx.strokeStyle = shape.color;
			this.ctx.setLineDash([0, 0]);
			this.ctx.strokeRect(
				shape.x,
				shape.y,
				shape.width,
				shape.height
			);

			this.shape = shape
			// console.log('shape', this.shape)

			this.shapes.push(new Shape(shape));
			console.log('canvas shapes:', this.shapes)

			// Draw all shapes in shapes list
			this.shapes.forEach(shape => {
				console.log('* shape', shape)
				this.ctx.strokeRect(
					shape.x,
					shape.y,
					shape.width,
					shape.height
				);
			});
		});
	};

	undo() {
		console.log('canvas undo', this.shape);
		if (!this.shape) {
			return console.error('Nothing to undo');
		}
		// TODO: find a better way to remove last draw
		// this.ctx.clearRect(this.shape.x -1, this.shape.y -1, this.shape.width +2, this.shape.height +2);
		this.ctx.drawImage(this.screenshot, 0, 0, W_OUTER_WIDTH, W_OUTER_HEIGHT);
		// TODO: Draw all shapes in this.shapes

		// Reset last draw
		this.shape = null;
	};
};

export default Canvas;