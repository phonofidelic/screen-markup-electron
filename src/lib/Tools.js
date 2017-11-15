import Shape from './Shape';
import {
	RECTANGLE,
	BRUSH,
	TEXT,
	ERASER,
	CROP
} from '../tooltypes';

const drawShapes = (ctx, shapeList) => {
	shapeList.forEach(shape => {
		ctx.setLineDash([0, 0]);
		shape.draw(ctx, shape);
	})
}

export class Rectangle {
	constructor() {
		this.type = 'rectangle';
		// Empty objects to hold shap and selData data
		this.shapeData = {
			// TODO: Set shapeData from settings props
			type: 'rectangle',
			strokeStyle: '#f22a2a',
			lineWidth: 3,
			lineDash: [0, 0]
		};
		this.selData = {
			strokeStyle: '#ccc',
			lineWidth: 3,
			lineDash: [4, 2]
		};
	}

	mouseDown(e, ctx, shapeList) {

		drawShapes(ctx, shapeList, this.draw);

		// Create selection shape
		this.sel = new Shape(this.selData);

		this.shapeData.x = e.clientX;
		this.shapeData.y = e.clientY;
		this.sel.x = e.clientX;
		this.sel.y = e.clientY;

		console.log('rectangle mouseDown', this.shapeData);
	}

	mouseMove(e, ctx, shapeList) {
		console.log('rectangle mouseMove');

		drawShapes(ctx, shapeList, this.draw);

		// Set style for selection shape
		ctx.strokeStyle = this.selData.strokeStyle;
		ctx.lineWidth = this.selData.lineWidth;
		ctx.setLineDash(this.selData.lineDash);

		// Set selection shape width and height
		this.sel.width = e.clientX - this.sel.x;
		this.sel.height = e.clientY - this.sel.y;

		this.sel.drawRect(ctx);
	}

	mouseUp(e, ctx, shapeList) {
		console.log('rectangle mouseUp');

		this.shapeData.width = e.clientX - this.shapeData.x;
		this.shapeData.height = e.clientY - this.shapeData.y;

		// Set style for shape
		ctx.strokeStyle = this.shapeData.strokeStyle;
		ctx.lineWidth = this.shapeData.lineWidth;
		ctx.setLineDash(this.shapeData.lineDash);

		// Add new shape to temp shapeList
		shapeList.push(new Shape(this.shapeData));

		drawShapes(ctx, shapeList)

		// Return temp shapeList to overwrite canvas shapeList
		return shapeList;
	}
}


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
		this.shapeData = {...DEFAULT_BRUSH_DATA};
	}

	mouseDown(e, ctx, shapeList) {
		console.log('brush mouseDown');

		drawShapes(ctx, shapeList);

		this.shapeData.x = e.clientX;
		this.shapeData.y = e.clientY;

		this.shape = new Shape(this.shapeData);
		this.shape.points.push({x: e.clientX, y: e.clientY});

		ctx.strokeStyle = this.shape.strokeStyle;
		ctx.lineWidth = this.shape.lineWidth;
		ctx.lineDash = this.shape.lineDash;
		
		ctx.moveTo(this.shape.x, this.shape.y);
		ctx.beginPath();
	}

	mouseMove(e, ctx, shapeList) {
		console.log('brush mouseMove');

		drawShapes(ctx, shapeList);

		const newPoint = {x: e.clientX, y: e.clientY};
		this.shape.points.push(newPoint);

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

export class Eraser {
	constructor() {
		this.type = 'eraser';
	}

	mouseDown() {
		console.log('eraser mouseDown');
	}

	mouseMove() {
		console.log('eraser mouseMove');
	}

	mouseUp() {
		console.log('eraser mouseUp');
	}
}

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