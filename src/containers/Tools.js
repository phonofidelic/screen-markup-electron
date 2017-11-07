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
        <FontAwesome name='crop' 
                     className="tool" 
                     title="Crop image"
                     style={tools.selectedTool === 'crop' ? {background: '#515151'} : null}
                     onClick={() => {selectSquare('crop'); canvas.selectCrop()}} />

        <FontAwesome name='square' 
                     className="tool color-picker" 
                     title="Color" 
                     style={{color: tools.selectedColor}}/>

        <FontAwesome name='pencil' 
                     className="tool" 
                     title="Draw"
                     style={tools.selectedTool === 'pencil' ? {background: '#515151'} : null}
                     onClick={() => {selectSquare('pencil'); canvas.selectPencil()}} />

        <FontAwesome name='eraser' 
                     className="tool" 
                     title="Erase"
                     style={tools.selectedTool === 'eraser' ? {background: '#515151'} : null}
                     onClick={() => {selectSquare('eraser'); canvas.selectEraser()}} />

        <FontAwesome name='font' 
                     className="tool" 
                     title="Text"
                     style={tools.selectedTool === 'text' ? {background: '#515151'} : null}
                     onClick={() => {selectSquare('text'); canvas.selectText()}} />

        <FontAwesome name='square-o' 
                     className="tool" 
                     title="Box"
                     style={tools.selectedTool === 'rect' ? {background: '#515151'} : null}
                     onClick={() => {selectSquare('rect'); canvas.selectRect()}} />

        <FontAwesome name='undo' 
                     className="tool" 
                     title="Undo"
                     onClick={() => { canvas.undo() }} />

        <FontAwesome name='floppy-o'
                     className="tool"
                     title="Save image"
                     onClick={() => { canvas.save() }} />

        <FontAwesome name='times' className="tool" title="Cancel" />
      </div>
		);
	}
}

const mapStateToProps = state => {
  return {
    tools: state.toolsReducer,
    // canvas: state.canvasReducer
  }
}

export default connect(mapStateToProps, actions)(Tools);