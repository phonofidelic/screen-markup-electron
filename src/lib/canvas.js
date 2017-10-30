class Canvas {
	constructor() {
		this.shapes = [];
		this.canvas = document.getElementById('canvas');
		// this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		// this.ctx.save();

		// Add screenshot to canvas
		// BUG: does not work outside of React
		this.screenshot = new Image();
		console.log('this.screenshot', this.screenshot)

		this.screenshot.addEventListener('load', e => {
			console.log('image loaded', this.screenshot)
			this.ctx.drawImage(this.screenshot, 0, 0, window.innerWidth, window.innerHeight);
		}, false);

		this.screenshot.src = 'screenshot.png';

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

			this.sel.x = e.clientX;
			this.sel.y = e.clientY;
		});

		this.canvas.addEventListener('mousemove', (e) => {
			if (mouseIsPressed) {
				console.log('mousemove canvas', e)
				// Create new shape outside of current canvas context
				const ctx = this.canvas.getContext('2d'); 
				ctx.strokeStyle = "#ccc";

				ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
				// Draw screenshot again
				this.ctx.drawImage(this.screenshot, 0, 0, window.innerWidth, window.innerHeight);

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
			this.ctx.strokeRect(
				shape.x,
				shape.y,
				shape.width,
				shape.height
			);

			this.shape = shape

			console.log('shape', this.shape)
			// this.shapes.push(shape);
			// console.log('canvas shapes:', this.shapes)
		});
	};

	undo() {
		console.log('canvas undo', this.shape);
		if (!this.shape) {
			return console.error('Nothing to undo');
		}
		// TODO: find a better way to remove last draw
		// this.ctx.clearRect(this.shape.x -1, this.shape.y -1, this.shape.width +2, this.shape.height +2);
		this.ctx.drawImage(this.screenshot, 0, 0, window.innerWidth, window.innerHeight);
		// Reset last draw
		this.shape = null;
	};
};

export default Canvas;