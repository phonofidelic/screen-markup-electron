import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import './App.css';
import Tools from './containers/Tools';
import CanvasContainer from './containers/CanvasContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
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
