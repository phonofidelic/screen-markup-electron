import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import ToolsContainer from './containers/ToolsContainer';
import CanvasContainer from './containers/CanvasContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToolsContainer />
        <CanvasContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
	return {
		canvasData: state.canvasReducer
	}
}

export default connect(mapStateToProps, actions)(App);
