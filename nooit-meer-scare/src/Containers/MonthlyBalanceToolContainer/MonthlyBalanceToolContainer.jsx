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
    }
  }

  openModal = (modalname) => {
    this.setState({ [modalname]: true });
  }

  closeModal = (modalname) => {
    this.setState({ [modalname]: false });
  }

  updateEntryForSubcategory = (subcategory, value) => {
    const {entries} = this.state;
    const inexOfElement = entries.findIndex(object => object.subcategory === subcategory);
    entries[inexOfElement].value = stringToFloat(value).toFixed(2);
    this.setState({...this.state, entries});
  }

  selectEntries = (subcategoryName, isChecked) => {
    const {entries} = this.state;
    const inexOfElement = entries.findIndex(object => object.subcategory === subcategoryName);
    entries[inexOfElement].selected = isChecked;
    this.setState( {...this.state, entries});
  }

  onFileLoaded = (loadedData) => {
    // Shift to remove headers
    loadedData.shift();
    const entries = loadedData.map(array => ({
      type: array[0],
      category: array[1],
      subcategory: array[2],
      selected: array[3] === "true",
      value: array[4]
    }))

    this.setState({entries});
  }

  render() {
    const { ExpensesModalOpen, IncomesModalOpen, entries} = this.state;
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
      />
    );
  }
}

export default MonthlyBalanceToolContainer;