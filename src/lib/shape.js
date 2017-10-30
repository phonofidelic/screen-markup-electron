/* 
sources:
https://simonsarris.com/making-html5-canvas-useful/
*/
class Shape {
	constructor(x, y, width, height) {
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 1;
		this.height = height || 1;
	}

	draw(ctx) {
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}
}

export default Shape;