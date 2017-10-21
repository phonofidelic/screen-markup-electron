import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FontAwesome from 'react-fontawesome';

class Tools extends Component {
  constructor(props) {
    super(props);

    console.log('* Tools props', props)
  }

	render() {
    const { 
      tools, 
      selectSquare, 
      undo, 
      canvas 
    } = this.props;

		return (
		  <div className="tools-container">
        <FontAwesome name='crop' className="tool" title="Crop image" />
        <FontAwesome name='square' 
                     className="tool color-picker" 
                     title="Color" 
                     style={{color: tools.selectedColor}}/>
        <FontAwesome name='pencil' className="tool" title="Draw" />
        <FontAwesome name='eraser' className="tool" title="Erase" />
        <FontAwesome name='font' className="tool" title="Text" />
        <FontAwesome name='square-o' 
                     className="tool" 
                     title="Box"
                     style={tools.square.isSelected ? {background: '#515151'} : null}
                     onClick={() => {selectSquare(canvas.canvasShapes[canvas.canvasShapes.length -1], tools.selectedColor)}} />
        <FontAwesome name='undo' 
                     className="tool" 
                     title="Undo"
                     onClick={() => {undo(canvas.canvasShapes)}} />
        <FontAwesome name='times' className="tool" title="Cancel" />
      </div>
		);
	}
}

const mapStateToProps = state => {
  return {
    tools: state.toolsReducer,
    canvas: state.canvasReducer
  }
}

export default connect(mapStateToProps, actions)(Tools);