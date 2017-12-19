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
	}

	draw(ctx) {
		switch(this.type) {
			case 'rectangle':
				return this.drawRect(ctx);

			case 'line':
				return this.drawLine(ctx);

			case 'eraser':
			 	return this.drawErase(ctx);
		}
	}

	drawRect(ctx) {
		ctx.strokeStyle = this.strokeStyle;
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}

	drawLine(ctx) {
		ctx.strokeStyle = this.strokeStyle;

		// Move canvas drawing point to first point in the line shape
		ctx.moveTo(this.points[0].x, this.points[0].y);
		// Add a path between each point in the line shape,
		// then draw the line
		this.points.forEach(point => {
			ctx.lineTo(point.x, point.y);
		});
		ctx.stroke();
	}

	drawErase(ctx) {
		ctx.strokeStyle = this.strokeStyle;

		// Move canvas drawing point to first point in the line shape
		ctx.moveTo(this.points[0].x, this.points[0].y);
		// Add a path between each point in the line shape,
		// then draw the line
		this.points.forEach(point => {
			ctx.lineTo(point.x, point.y);
		});
		ctx.stroke();
	}
}

export default Shape;