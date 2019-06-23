import React, { Component } from 'react';
import Analysistool from '../../Components/AnalysisTool/Analysistool';

class AnalysisContainer extends Component {
  onFileLoaded = loadedData => {
    // Shift to remove headers
    loadedData.shift();
    const entries = loadedData.map(array => ({
      type: array[0],
      category: array[1],
      subcategory: array[2],
      selected: array[3] === 'true',
      value: array[4],
    }));

    this.setState({ entries });
  };

  render() {
    return <Analysistool onFileLoaded={this.onFileLoaded} />;
  }
}

export default AnalysisContainer;
