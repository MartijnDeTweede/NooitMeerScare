import React, { Component } from 'react';
import MonthlyBalanceTool from '../../Components/MonthlyBalanceTool/MonthlyBalanceTool';
import Entries from './entries.json';
import { stringToFloat } from '../../Helpers/DataTransformations';
class MonthlyBalanceToolContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ExpensesModalOpen: false,
      IncomesModalOpen: false,
      entries: Entries,
      stage: 'form',
      needs: null,
      wants: null,
      savings: null,
      totalIncome: null,
      needsPercentage: null,
      wantsPercentage: null,
      savingsPercentage: null,
    };
  }

  openModal = modalname => {
    this.setState({ [modalname]: true });
  };

  closeModal = modalname => {
    this.setState({ [modalname]: false });
  };

  updateEntryForSubcategory = (subcategory, value) => {
    const { entries } = this.state;
    const inexOfElement = entries.findIndex(
      object => object.subcategory === subcategory
    );
    entries[inexOfElement].value = stringToFloat(value).toFixed(2);
    this.setState({ ...this.state, entries });
  };

  selectEntries = (subcategoryName, isChecked) => {
    const { entries } = this.state;
    const inexOfElement = entries.findIndex(
      object => object.subcategory === subcategoryName
    );
    entries[inexOfElement].selected = isChecked;
    this.setState({ ...this.state, entries });
  };


  analysis = entries => {
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
    
    this.analysis(entries);
  };

  analyzeClicked = (entries) => {
    console.log('boo');
    this.analysis(entries);
    this.setState({stage: 'analysis'})
  }

  render() {
    const { ExpensesModalOpen, IncomesModalOpen, entries, stage, wants, needs, savings, needsPercentage, wantsPercentage, savingsPercentage } = this.state;
    return (
      <MonthlyBalanceTool
        ExpensesModalOpen={ExpensesModalOpen}
        IncomesModalOpen={IncomesModalOpen}
        entries={entries}
        openModal={this.openModal}
        closeModal={this.closeModal}
        updateEntryForSubcategory={this.updateEntryForSubcategory}
        selectEntries={this.selectEntries}
        onFileLoaded={this.onFileLoaded}
        stage={stage}
        wants={wants}
        needs={needs}
        savings={savings}
        needsPercentage={needsPercentage}
        wantsPercentage={wantsPercentage}
        savingsPercentage={savingsPercentage}
        analyze={() => this.analyzeClicked(entries)}
      />
    );
  }
}

export default MonthlyBalanceToolContainer;
