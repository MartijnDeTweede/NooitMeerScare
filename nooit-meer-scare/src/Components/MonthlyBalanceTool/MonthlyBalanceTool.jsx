import React, { Component } from 'react';
import ExpensesModal from '../ExpensesModal/ExpensesModal';
import MajorButton from '../MajorButton/MajorButton';

class MonthlyBalanceTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ExpensesModalOpen: false,
    }
  }
  openModal = (modalname) => {
    this.setState({ [modalname]: true });
  }

  closeModal = (modalname) => {
    this.setState({ [modalname]: false });
  }

  render() {
    const { ExpensesModalOpen } = this.state;

    return (
      <div>
        Dit is de monthlyBalancetool
        <MajorButton text="Kies uitgaven" onClick={() => {this.openModal('ExpensesModalOpen')}} />
        <ExpensesModal isOpen={ExpensesModalOpen} closeModal={() => {this.closeModal('ExpensesModalOpen')}}/>
      </div>
    );
  }
}

export default MonthlyBalanceTool;