import { INIT_CANVAS, SET_COLOR, SELECT_SQUARE } from '../actiontypes';

export const initCanvas = () => {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	return dispatch => {
		dispatch({
			type: INIT_CANVAS,
			canvas: canvas
		});
	}
}

export const selectSquare = (canvas, selectedColor) => {
	console.log('@action SELECT_SQUARE');

	var ctx = canvas.getContext('2d');

	let rect = {
		x: null,
		y: null,
		width: null,
		height: null
	};

	let mouseIsPressed = false;

	canvas.addEventListener('mousedown', (e) => {
			console.log('* mousedown canvas', e)
			mouseIsPressed = true;
			rect.x = e.clientX;
			rect.y = e.clientY;
		});

		canvas.addEventListener('mousemove', (e) => {
			if (mouseIsPressed) {
				console.log('* mousemove canvas', e)
				ctx.moveTo(e.clientX, e.clientY)
			}
		});		

		canvas.addEventListener('mouseup', (e) => {
			console.log('* mouseup canvas')
			mouseIsPressed = false;
			rect.width = e.clientX - rect.x;
			rect.height = e.clientY - rect.y;

			ctx.strokeStyle = selectedColor;
			ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

			// console.log('* rect:', rect)
		});
	return dispatch => {
		dispatch({
			type: SELECT_SQUARE
		});
	}
};

export const drawSquare = (ctx) => {

}