import { INIT_CANVAS, SET_COLOR, SELECT_SQUARE, ADD_SHAPE, DRAW_SHAPE, UNDO_LAST_DRAW } from '../actiontypes';



export const selectSquare = (canvas, selectedColor) => {
	console.log('@action SELECT_SQUARE');

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	let rect = {
		x: null,
		y: null,
		width: null,
		height: null,
		color: selectedColor
	};

	let mouseIsPressed = false;

	return dispatch => {
		canvas.addEventListener('mousedown', (e) => {
			console.log('* mousedown canvas', e)
			mouseIsPressed = true;
			rect.x = e.clientX;
			rect.y = e.clientY;
		});

		canvas.addEventListener('mousemove', (e) => {
			if (mouseIsPressed) {
				// console.log('* mousemove canvas', e)
				// ctx.moveTo(e.clientX, e.clientY)
			}
		});		

		canvas.addEventListener('mouseup', (e) => {
			console.log('* mouseup canvas')
			mouseIsPressed = false;
			rect.width = e.clientX - rect.x;
			rect.height = e.clientY - rect.y;

			_drawSquare(ctx, rect, selectedColor);
			// console.log('* rect:', rect)

			// Push new canvas state to the canvasStates array in reducer
			dispatch({
				type: ADD_SHAPE,
				lastDraw: rect
			});
		});
	}


	return dispatch => {
		dispatch({
			type: SELECT_SQUARE
		});
	}
};

// TODO: Make generic draw function that draws all stored shapes 
// export const draw = (newState) => {
// 	console.log('* draw')
// 	const canvas = document.getElementById('canvas');
// 	let ctx = canvas.getContext('2d');

// 	// Clear canvas before drawing new state
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	newState.map(shape => {
// 		ctx.strokeStyle = shape.color;
// 		ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
// 	});

// 	return dispatch => {
// 		dispatch({
// 			type: DRAW_SHAPE
// 		});
// 	}
// }

export const _drawSquare = (ctx, rect, selectedColor) => {
	ctx.strokeStyle = selectedColor;
	ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
	ctx.save();

	console.log('* drawSquare, ctx:', ctx)
};

export const undo = (canvasStates) => {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.restore();
	console.log('* undo, ctx', ctx);
	// Pop last canvas state from the canvasStates array 
	return dispatch => {
		dispatch({
			type: UNDO_LAST_DRAW
		})
	}
}