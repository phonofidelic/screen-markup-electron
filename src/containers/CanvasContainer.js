import React, { Component } from 'react';

class CanvasContainer extends Component {

	componentDidMount() {
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		ctx.canvas.width = window.innerWidth;
		ctx.canvas.height = window.innerHeight;

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

			ctx.strokeStyle = 'red';
			ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

			console.log('* rect:', rect)
		});
	}

	render() {
		return (
			<div className="canvas-container">
				<canvas id="canvas" />
			</div>
		);
	}
}

export default CanvasContainer;