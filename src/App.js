import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tools from './containers/Tools';
import CanvasContainer from './containers/CanvasContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CanvasContainer />
        <Tools />
      </div>
    );
  }
}

export default App;
