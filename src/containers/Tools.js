import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Tools extends Component {
	render() {
		return (
		  <div className="tools-container">
        <FontAwesome name='crop' className="tool" title="Crop image" />
        <FontAwesome name='pencil' className="tool" title="Draw" />
        <FontAwesome name='eraser' className="tool" title="Erase" />
        <FontAwesome name='font' className="tool" title="Text" />
        <FontAwesome name='square-o' className="tool" title="Box" />
        <FontAwesome name='undo' className="tool" title="Undo" />
        <FontAwesome name='times' className="tool" title="Cancel" />
      </div>
		);
	}
}

export default Tools;