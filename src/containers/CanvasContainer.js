import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Canvas from '../components/Canvas';

class CanvasContainer extends Component {

	render() {
		const { selectedTool } = this.props.tools;
		return (
			<div>
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
