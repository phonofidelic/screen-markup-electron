import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		console.log('* CanvasContainer props', props)
	}

	componentDidMount() {
		// TODO: move to an action?

		this.props.initCanvas();
		

		
	}

	render() {
		return (
			<div className="canvas-container">
				<canvas id="canvas" />
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
