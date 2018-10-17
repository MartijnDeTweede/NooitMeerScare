import React, { Component } from 'react';
import ExpensesModal from '../ExpensesModal/ExpensesModal';
import MajorButton from '../MajorButton/MajorButton';
import Expenses from './expenses.json';
import './monthlyBalanceTool.css';
import HeaderData from './headers.json';
import { renderTotalAmountRow, renderHeaders } from '../Helpers/TableHelpers';
import  { stringToFloat } from '../Helpers/DataTransformations';

class MonthlyBalanceTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ExpensesModalOpen: false,
      expenses: Expenses,
    }
  }

  openModal = (modalname) => {
    this.setState({ [modalname]: true });
  }

  closeModal = (modalname) => {
    this.setState({ [modalname]: false });
  }

  updateExpenseForSubCatagory = (subcatagory, value) => {
    const { expenses } = this.state;
    const inexOfElement = expenses.findIndex(object => object.subcatagory === subcatagory);
    expenses[inexOfElement].value = stringToFloat(value).toFixed(2);
    this.setState({expenses});
  }

  renderTableRow = (expense) => (
    <tr key={expense.subcatagory}>
      <td>{expense.catagory}</td>
      <td>{expense.subcatagory}</td>
      <td>
        <input type="number" name={expense.subcatagory} defaultValue={expense.value} onBlur={(e) => this.updateExpenseForSubCatagory(expense.subcatagory, e.target.value)}/>
      </td>
    </tr>
  )

  renderTable = (balanceItems) => {
    const selectedItem = balanceItems.filter(item => item.selected);
    return (
    <table>
      <tbody>
        {renderHeaders(HeaderData)}
        {selectedItem.map(item => this.renderTableRow(item))}
        {renderTotalAmountRow(selectedItem)}    
      </tbody>
    </table>
  )}

  render() {
    const { ExpensesModalOpen } = this.state;

    return (
      <div>
        Dit is de monthlyBalancetool
        {this.renderTable(this.state.expenses)}
        <MajorButton text="Kies uitgaven" onClick={() => {this.openModal('ExpensesModalOpen')}} />
        <ExpensesModal expenses={this.state.expenses} isOpen={ExpensesModalOpen} closeModal={() => {this.closeModal('ExpensesModalOpen')}}/>
      </div>
    );
  }
}

export default MonthlyBalanceTool;