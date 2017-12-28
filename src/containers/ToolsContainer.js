import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FontAwsome from 'react-fontawesome';
import Tool from '../components/Tool';

class ToolsContainer extends Component {
  constructor(props) {
    super(props);

    // Default tool selection
    this.props.selectTool(this.props.tools.selectedTool);
    this.selectTool = this.props.selectTool.bind(this);
  }

  componentDidMount() {
    const { selectTool } = this.props.tools;
    if (window.require) {
      const { ipcRenderer } = window.require('electron');

      // Listen for tool selection sent from keyboard shortcuts in main process
      ipcRenderer.on('select-rectangle', () => { this.selectTool('rectangle'); });
      ipcRenderer.on('select-brush', () => { this.selectTool('brush'); });
    } 
  }

  renderTools() {
    const {tools, selectTool} = this.props;

    return tools.toolsList.map((tool, i) => {
      return (
        <Tool faName={tool.faName}
              title={tool.title}
              tooltype={tool.tooltype}
              selectTool={selectTool}
              selectedTool={tools.selectedTool.type}
              key={i} />
      )
    });
  }

	render() {
    const { 
      tools, 
      toggleTools
    } = this.props;

    console.log('showTools:', tools.showTools)
		return (
		  <div className="tools-container">
        <FontAwsome name='bars' 
                    className="tool"
                    onClick={() => { toggleTools() }} />
        {tools.showTools && this.renderTools()}
      </div>
		);
	}
}

const mapStateToProps = state => {
  return {
    tools: state.toolsReducer,
  }
}

export default connect(mapStateToProps, actions)(ToolsContainer)
