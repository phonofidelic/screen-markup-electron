var canvasBuffer = require('electron-canvas-to-buffer');
var fs = require('fs');

const electronCanvas = () => {
	// your canvas drawing
	var canvas = document.createElement('canvas')
	var context = canvas.getContext('2d')
	context.fillRect(0, 0, 50, 50)
	context.fillStyle = 'red'
	context.fillRect(50, 10, 30, 20)

	// as a buffer
	var buffer = canvasBuffer(canvas, 'image/png')

	// write canvas to file
	fs.writeFile('image.png', buffer, function (err) {
	  throw err
	})
};

module.exports = electronCanvas;