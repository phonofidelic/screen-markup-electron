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

			case 'arrow':
				return this.drawArrow(ctx);

			default: console.error('Invalid shape type');
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

	// http://www.dbp-consulting.com/tutorials/canvas/CanvasArrow.html
	drawArrowHead(ctx, x1, x2, y1, y2, angle) {
		const lineAngle = Math.atan2(y2-y1, x2-x1);
		const h = Math.abs(10/Math.cos(angle));

		const angle1 = lineAngle - 15;
		const topX = x2 + Math.cos(angle1)*h;
		const topY = y2 + Math.sin(angle1)*h;
		const angle2 = lineAngle + 15;
		const botX = x2 + Math.cos(angle2)*h;
		const botY = y2 + Math.sin(angle2)*h;

		ctx.lineJoin = "round";
	  ctx.lineTo(topX, topY);
	  ctx.moveTo(x2, y2);
	  ctx.lineTo(botX, botY);
	}

	drawArrow(ctx) {
		ctx.moveTo(this.points[0].x, this.points[0].y);
		ctx.lineTo(this.points[1].x, this.points[1].y);
		// Draw arrow shape at the end of the line shape
		this.drawArrowHead(
			ctx, 
			this.points[0].x,
			this.points[1].x,
			this.points[0].y,
			this.points[1].y,
			1
		);

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