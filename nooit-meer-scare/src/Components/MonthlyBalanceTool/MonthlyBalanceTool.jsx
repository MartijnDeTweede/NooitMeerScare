import React, { Component } from 'react';
import ExpensesModal from '../ExpensesModal/ExpensesModal';
import MajorButton from '../MajorButton/MajorButton';
import Expenses from './expenses.json';
import './monthlyBalanceTool.css';
import HeaderData from './headers.json';

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

  renderHeaders = () => (
    <tr>
      {HeaderData.map(header => (
        <td>
          <span >{header.value}</span>
        </td>        
      ))}
    </tr>
  )

  renderExpenses = () => {
    const filtedExpenses = this.state.expenses.filter(expense => expense.selected);
    return (
    <table>
      {this.renderHeaders()}
      {filtedExpenses.map(expense => (
        <tr>
          <td>
            <span>{expense.catagory}</span>
          </td>
          <td>
            <span>{expense.subcatagory}</span>
          </td>
          {expense.values.map(value => (<td>€ {value.ammount}</td>))}
        </tr>
      ))}
    </table>
  )}

  render() {
    const { ExpensesModalOpen } = this.state;

    return (
      <div>
        Dit is de monthlyBalancetool
        {this.renderExpenses()}
        <MajorButton text="Kies uitgaven" onClick={() => {this.openModal('ExpensesModalOpen')}} />
        <ExpensesModal isOpen={ExpensesModalOpen} closeModal={() => {this.closeModal('ExpensesModalOpen')}}/>
      </div>
    );
  }
}

export default MonthlyBalanceTool;