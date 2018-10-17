import React, { Component } from 'react';
import BalanceItemModal from '../BalanceItemModal/BalanceItemModal';
import MajorButton from '../MajorButton/MajorButton';
import Expenses from './expenses.json';
import Incomes from './incomes.json';
import './monthlyBalanceTool.css';
import HeaderData from './headers.json';
import { renderTotalAmountRow, renderHeaders } from '../Helpers/TableHelpers';
import  { stringToFloat } from '../Helpers/DataTransformations';

class MonthlyBalanceTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ExpensesModalOpen: false,
      IncomesModalOpen: false,
      expenses: Expenses,
      incomes: Incomes,
    }
  }

  openModal = (modalname) => {
    this.setState({ [modalname]: true });
  }

  closeModal = (modalname) => {
    this.setState({ [modalname]: false });
  }

  updateBalanceItemForSubCatagory = (subcatagory, value, set) => {
    const inexOfElement = set.findIndex(object => object.subcatagory === subcatagory);
    set[inexOfElement].value = stringToFloat(value).toFixed(2);
    this.setState({...this.state, set});
  }

  renderTableRow = (balanceItem, balanceItems) => (
    <tr key={balanceItem.subcatagory}>
      <td>{balanceItem.catagory}</td>
      <td>{balanceItem.subcatagory}</td>
      <td>
        <input type="number" name={balanceItem.subcatagory} defaultValue={balanceItem.value} onBlur={(e) => this.updateBalanceItemForSubCatagory(balanceItem.subcatagory, e.target.value, balanceItems)}/>
      </td>
    </tr>
  )

  selectBalanceItem = (subcatagoryName, isChecked, set) => {
    const inexOfElement = set.findIndex(object => object.subcatagory === subcatagoryName);
    set[inexOfElement].selected = isChecked;
    this.setState( {...this.state, set});
  }

  renderTable = (balanceItems) => {
    const selectedItem = balanceItems.filter(item => item.selected);
    return (
    <table>
      <tbody>
        {renderHeaders(HeaderData)}
        {selectedItem.map(item => this.renderTableRow(item, balanceItems))}
        {renderTotalAmountRow(selectedItem)}    
      </tbody>
    </table>
  )}

  render() {
    const { ExpensesModalOpen, IncomesModalOpen } = this.state;
    return (
      <div>
        Dit is de monthlyBalancetool
        {this.renderTable(this.state.expenses)}
        {this.renderTable(this.state.incomes)}
        <MajorButton text="Kies uitgaven" onClick={() => {this.openModal('ExpensesModalOpen')}} />
        <MajorButton text="Kies inkomsten" onClick={() => {this.openModal('IncomesModalOpen')}} />
        <BalanceItemModal 
          modalKey="IncomesModalOpen"
          text="Kies je inkomsten"
          selectBalanceItem={this.selectBalanceItem}
          balanceItems={this.state.incomes}
          isOpen={IncomesModalOpen}
          closeModal={() => {this.closeModal('IncomesModalOpen')}}
        />
        <BalanceItemModal 
          modalKey="ExpensesModalOpen"
          text="Kies je uitgaven"
          selectBalanceItem={this.selectBalanceItem}
          balanceItems={this.state.expenses}
          isOpen={ExpensesModalOpen}
          closeModal={() => {this.closeModal('ExpensesModalOpen')}}
        />
      </div>
    );
  }
}

export default MonthlyBalanceTool;