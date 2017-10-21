class Canvas {
	constructor() {
		// this.shapes = [];
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx.save();

		let mouseIsPressed = false;
		let shape = {
			x: null,
			y: null,
			width: null,
			height: null,
			color: '#f22a2a'	// TODO: make dynamic
		}

		this.canvas.addEventListener('mousedown', e => {
			console.log('mousedown canvas')
			shape.x = e.clientX;
			shape.y = e.clientY;
		});

		this.canvas.addEventListener('mousemove', (e) => {
			if (mouseIsPressed) {
				console.log('mousemove canvas', e)
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
		this.ctx.clearRect(this.shape.x -1, this.shape.y -1, this.shape.width +2, this.shape.height +2);
	};
};

export default Canvas;