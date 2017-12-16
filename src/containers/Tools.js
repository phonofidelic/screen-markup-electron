import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FontAwesome from 'react-fontawesome';
import Tool from '../components/Tool';

class Tools extends Component {
  constructor(props) {
    super(props);

    console.log('* Tools props', props)

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

	render() {
    const { 
      tools, 
      selectTool,
      selectRectangle,
      selectBrush,
      selectText,
      selectEraser,
      selectCrop
    } = this.props;

		return (
		  <div className="tools-container">
        {tools.toolsList.map((tool, i) => {
          return(
            <Tool faName={tool.faName}
                  title={tool.title}
                  tooltype={tool.tooltype}
                  selectTool={selectTool}
                  selectedTool={tools.selectedTool.type}
                  key={i} />
          )
        })}

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

export default connect(mapStateToProps, actions)(Tools);