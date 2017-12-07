import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CanvasClass from '../lib/Canvas';
import FontAwesome from 'react-fontawesome';
import Canvas from '../components/Canvas';
import Tools from './Tools';

class CanvasContainer extends Component {

	render() {
		const { selectedTool } = this.props.tools;
		// console.log('CanvasContainer, this:', this)
		return (
			<div>
				<div className="tools-container">
					<Tools />										 
				</div>

				<div className="canvas-container">
					<Canvas width={window.outerWidth} 
									height={window.outerHeight}
									tool={selectedTool} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    tools: state.toolsReducer
  }
}

export default connect(mapStateToProps, actions)(CanvasContainer);
