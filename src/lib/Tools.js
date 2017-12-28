import Shape from './Shape';
// import {
// 	RECTANGLE,
// 	BRUSH,
// 	TEXT,
// 	ERASER,
// 	CROP
// } from '../tooltypes';

const drawShapes = (ctx, shapeList) => {
	shapeList.forEach(shape => {
		ctx.setLineDash([0, 0]);
		shape.draw(ctx, shape);
	})
}

/****************** RECTANGLE **********************/
const DEFAULT_RECTANGLE_DATA = {
	// TODO: Set shapeData from settings props
	type: 'rectangle',
	strokeStyle: '#f22a2a',
	lineWidth: 3,
	lineDash: [0, 0]
};

export class Rectangle {
	constructor() {
		this.type = 'rectangle';
		// Empty objects to hold shap and selData data
		this.shapeData = DEFAULT_RECTANGLE_DATA;
		this.selData = {
			strokeStyle: '#ccc',
			lineWidth: 3,
			lineDash: [4, 2]
		};
	}

	mouseDown(e, ctx, shapeList) {

		drawShapes(ctx, shapeList);

		// Create selection shape
		this.sel = new Shape(this.selData);

		this.shapeData.x = e.pageX;
		this.shapeData.y = e.pageY;
		this.sel.x = e.pageX;
		this.sel.y = e.pageY;

		console.log('rectangle mouseDown', this.shapeData);
	}

	mouseMove(e, ctx, shapeList) {
		console.log('rectangle mouseMove');

		drawShapes(ctx, shapeList);

		// Set style for selection shape
		ctx.strokeStyle = this.selData.strokeStyle;
		ctx.lineWidth = this.selData.lineWidth;
		ctx.setLineDash(this.selData.lineDash);

		// Set selection shape width and height
		this.sel.width = e.pageX - this.sel.x;
		this.sel.height = e.pageY - this.sel.y;

		this.sel.drawRect(ctx);
	}

	mouseUp(e, ctx, shapeList) {
		console.log('rectangle mouseUp');

		this.shapeData.width = e.pageX - this.shapeData.x;
		this.shapeData.height = e.pageY - this.shapeData.y;

		// Set style for shape
		ctx.strokeStyle = this.shapeData.strokeStyle;
		ctx.lineWidth = this.shapeData.lineWidth;
		ctx.setLineDash(this.shapeData.lineDash);

		// Add new shape to temp shapeList
		shapeList.push(new Shape(this.shapeData));

		drawShapes(ctx, shapeList);

		// Return temp shapeList to overwrite canvas shapeList
		return shapeList;
	}
}

/****************** Brush **********************/
const DEFAULT_BRUSH_DATA = {
	// TODO: Set shapeData from settings props
	type: 'line',
	strokeStyle: '#f22a2a',
	lineWidth: 3,
	lineDash: [0, 0],
	points: []
};

export class Brush {
	constructor() {
		this.type = 'brush';
		this.shapeData = DEFAULT_BRUSH_DATA;
	}

	mouseDown(e, ctx, shapeList) {
		console.log('brush mouseDown');

		drawShapes(ctx, shapeList);

		this.shapeData.x = e.pageX;
		this.shapeData.y = e.pageY;

		this.shape = new Shape(this.shapeData);
		this.shape.points.push({x: e.pageX, y: e.pageY});

		ctx.strokeStyle = this.shape.strokeStyle;
		ctx.lineWidth = this.shape.lineWidth;
		ctx.lineDash = this.shape.lineDash;
		
		ctx.moveTo(this.shape.x, this.shape.y);
		ctx.beginPath();
	}

	mouseMove(e, ctx, shapeList) {
		console.log('brush mouseMove');

		drawShapes(ctx, shapeList);

		this.shape.points.push({x: e.pageX, y: e.pageY});

		this.shape.drawLine(ctx);
	}

	mouseUp(e, ctx, shapeList) {
		console.log('brush mouseUp');
		
		shapeList.push(this.shape);

		drawShapes(ctx, shapeList);

		// Empty points array so it is ready to hold new values for next line shape
		this.shapeData.points = [];

		return shapeList;
	}
}

/****************** ARROW **********************/
const DEFAULT_ARROW_DATA = {
	// TODO: Set shapeData from settings props
	type: 'arrow',
	strokeStyle: '#f22a2a',
	lineWidth: 3,
	lineDash: [0, 0],
	points: []
}

export class Arrow {
	constructor() {
		this.type = 'arrow';
		this.shapeData = DEFAULT_ARROW_DATA;
	}

	mouseDown(e, ctx, shapeList) {
		console.log('arrow mouseDown');

		drawShapes(ctx, shapeList);

		this.shapeData.x = e.pageX;
		this.shapeData.y = e.pageY;

		this.shape = new Shape(this.shapeData);
		this.shape.points.push({ 
			x: e.pageX, 
			y: e.pageY 
		});

		// Set shape styles
		ctx.strokeStyle = this.shape.strokeStyle;
		ctx.lineWidth = this.shape.lineWidth;
		ctx.lineDash = this.shape.lineDash;

		ctx.moveTo(this.shape.x, this.shape.y);
		ctx.beginPath();
	}

	mouseMove(e, ctx, shapeList) {
		console.log('arrow mouseMove');

		drawShapes(ctx, shapeList);

		if (this.shape.points.length > 1) {
			this.shape.points.pop();
		}
		this.shape.points.push({ x: e.pageX, y: e.pageY });
	
		ctx.beginPath();
		this.shape.drawArrow(ctx);
	}

	mouseUp(e, ctx, shapeList) {
		console.log('arrow mouseUp');

		shapeList.push(this.shape);

		drawShapes(ctx, shapeList);

		this.shapeData.points = [];

		return shapeList;
	}
}

/****************** ERASER **********************/
const DEFAULT_ERASER_DATA = {
	// TODO: Set shapeData from settings props
	type: 'eraser',
	strokeStyle: '#f22a2a',
	lineWidth: 10,
	lineDash: [0, 0],
	points: []
};

export class Eraser {
	constructor() {
		this.type = 'eraser';
		this.shapeData = DEFAULT_ERASER_DATA;
	}

	mouseDown(e, ctx, shapeList) {
		console.log('eraser mouseDown');

		drawShapes(ctx, shapeList);

		this.shapeData.x = e.pageX;
		this.shapeData.y = e.pageY;

		this.shape = new Shape(this.shapeData);
		this.shape.points.push({ x: e.pageX, y: e.pageY });

		ctx.strokeStyle = this.shape.strokeStyle;
		ctx.lineWidth = this.shape.lineWidth;
		ctx.lineDash = this.shape.lineDash;
		
		ctx.moveTo(this.shape.x, this.shape.y);
		ctx.beginPath();
	}

	mouseMove(e, ctx, shapeList) {
		console.log('eraser mouseMove');

		drawShapes(ctx, shapeList);

		const newPoint = {x: e.pageX, y: e.pageY};
		this.shape.points.push(newPoint);

		this.shape.drawErase(ctx);
	}

	mouseUp(e, ctx, shapeList) {
		console.log('eraser mouseUp');

		// Will this work?
		shapeList.push(this.shape);

		drawShapes(ctx, shapeList);

		// Empty points array so it is ready to hold new values for next line shape
		this.shapeData.points = [];

		return shapeList;
	}
}

/****************** TEXT **********************/
export class Text {
	constructor() {
		this.type = 'text';
	}

	mouseDown() {
		console.log('text mouseDown');
	}

	mouseMove() {
		console.log('text mouseMove');
	}

	mouseUp() {
		console.log('text mouseUp');
	}
}

/****************** CROP **********************/
export class Crop {
	constructor() {
		this.type = 'crop';
	}

	mouseDown() {
		console.log('crop mouseDown');
	}

	mouseMove() {
		console.log('crop mouseMove');
	}

	mouseUp() {
		console.log('crop mouseUp');
	}
}