import React, { Component } from 'react';
import FontAwsome from 'react-fontawesome';

class Tool extends Component {
	render() {
		const { faName, title, selectTool, tooltype, selectedTool } = this.props;
		return (
			<FontAwsome name={faName}
									className="tool"
									title={title}
									style={selectedTool === tooltype ? {background: '#515151'} : null}
									onClick={() => {selectTool(tooltype)}} />
		);
	}
}

export default Tool;