import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FontAwsome from 'react-fontawesome';
import Tool from '../components/Tool';

class ToolsContainer extends Component {
  constructor(props) {
    super(props);

    console.log('* ToolsContainer props', props)

    // Default tool selection
    this.props.selectRectangle();
  }

  componentDidMount() {
    const { selectRectangle, selectBrush } = this.props;
    if (window.require) {
      const { ipcRenderer } = window.require('electron');

      // Listen for tool selection sent from keyboard shortcuts in main process
      ipcRenderer.on('select-rectangle', () => { selectRectangle(); });
      ipcRenderer.on('select-brush', () => { selectBrush(); });
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
      selectTool,
      toggleTools
    } = this.props;

    console.log('showTools:', tools.showTools)
		return (
		  <div className="tools-container">
        <FontAwsome name='bars' 
                    className="tool"
                    onClick={() => { toggleTools() }} />
        {tools.showTools && this.renderTools()}

        {/*<FontAwesome name='crop' 
                             className="tool" 
                             title="Crop image"
                             style={tools.selectedTool.type === 'crop' ? {background: '#515151'} : null}
                             onClick={() => { selectCrop() }} />*/}

        {/*<FontAwesome name='square' 
                             className="tool color-picker" 
                             title="Color" 
                             style={{color: tools.selectedColor}}/>*/}



        {/*<FontAwesome name='eraser' 
                             className="tool" 
                             title="Erase"
                             style={tools.selectedTool.type === 'eraser' ? {background: '#515151'} : null}
                             onClick={() => { selectEraser() }} />*/}

        {/*<FontAwesome name='font' 
                             className="tool" 
                             title="Text"
                             style={tools.selectedTool.type === 'text' ? {background: '#515151'} : null}
                             onClick={() => { selectText() }} />*/}

        


        {/*<FontAwesome name='times' className="tool" title="Cancel" />*/}
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
