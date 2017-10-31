/* 
sources:
https://simonsarris.com/making-html5-canvas-useful/
*/
class Shape {
	constructor(options) {
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.width = options.width || 1;
		this.height = options.height || 1;
	}

	draw(ctx) {
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}
}

export default Shape;