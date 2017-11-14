/* 
sources:
https://simonsarris.com/making-html5-canvas-useful/
*/
class Shape {
	constructor(options) {
		this.type = options.type || '';
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.width = options.width || 1;
		this.height = options.height || 1;
		this.strokeStyle = options.strokeStyle || null;
		this.points = options.points || [];
		this.beginLine = options.beginLine || {}
	}

	draw(ctx) {
		switch(this.type) {
			case 'rectangle':
				this.drawRect(ctx);

			case 'line':
				this.drawLine(ctx);
		}
	}

	drawRect(ctx) {
		// BUG: draw method only handles rectangles,
		// needs to be able to handle other shapes
		ctx.strokeStyle = this.strokeStyle;
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}

	drawLine(ctx) {
		// ctx.strokeStyle = this.strokeStyle;
		ctx.beginPath();
		ctx.moveTo(this.beginLine.x, this.beginLine.y);
		// ctx.lineTo(this.x, this.y);
		this.points.forEach(point => {			
			ctx.lineTo(point.x, point.y);
		});
		ctx.stroke();
	}
}

export default Shape;