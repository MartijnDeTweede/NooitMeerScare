import React, { Component } from 'react';
import Analysistool from '../../Components/AnalysisTool/Analysistool';

class AnalysisContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: null,
      wants: null,
      savings: null,
      totalIncome: null,
      needsPercentage: null,
      wantsPercentage: null,
      savingsPercentage: null,
    };
  }

  onFileLoaded = loadedData => {
    // Shift to remove headers
    loadedData.shift();
    const entries = loadedData.map(array => ({
      type: array[0],
      subtype:array[1],
      category: array[2],
      subcategory: array[3],
      value: array[5],
    }));
    
    const totalIncome = entries.reduce((accumulator, currentValue) => {
      if(currentValue.type === 'income') {
        return accumulator + parseInt(currentValue.value,10);
      }
      return accumulator;
    }, 0);

    const needs = entries.reduce((accumulator, currentValue) => {
      if(currentValue.subtype === 'need') {
        return accumulator + parseInt(currentValue.value,10);
      }
      return accumulator;
    }, 0);

    const wants = entries.reduce((accumulator, currentValue) => {
      if(currentValue.subtype === 'want') {
        return accumulator + parseInt(currentValue.value,10);
      }
      return accumulator;
    }, 0);

    const savingsFromFile = entries.reduce((accumulator, currentValue) => {
      if(currentValue.subtype === 'saving') {
        return accumulator + parseInt(currentValue.value,10);
      }
      return accumulator;
    }, 0);

    const remainingbalance = totalIncome - wants - needs - savingsFromFile;
    const savings = savingsFromFile + remainingbalance;

    const needsPercentage = needs / totalIncome;
    const wantsPercentage = wants / totalIncome;
    const savingsPercentage = savings / totalIncome;

    this.setState({ totalIncome, wants, needs, savings, needsPercentage, wantsPercentage, savingsPercentage });
  };

  render() {
    const {
      wants,
      needs,
      savings,
      needsPercentage,
      wantsPercentage,
      savingsPercentage,
    } = this.state;

    return <Analysistool
      onFileLoaded={this.onFileLoaded}
      wants={wants}
      needs={needs}
      savings={savings}
      needsPercentage={needsPercentage}
      wantsPercentage={wantsPercentage}
      savingsPercentage={savingsPercentage}
    />;
  }
}

export default AnalysisContainer;
