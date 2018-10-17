import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';
import './ExpensesModal.css';
import {getCatagoriesWithSubCatagories} from '../Helpers/DataTransformations';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

class ExpensesModal extends Component {

  renderCatagories = (catagories) => (
      Object.keys(catagories).map(catagory => (
      <AccordionItem title={catagory}>
      {catagories[catagory].map(subcatagory => (
        <div>
          <input type="checkbox" checked={subcatagory.selected} onChange={(e) => this.props.selectExpenses(subcatagory.subcatagory, e.target.checked )} name={subcatagory.subcatagory} /> {subcatagory.subcatagory} 
        </div>
      ))}
    </AccordionItem>
    ))
  )

  render() {
    const {
      isOpen,
      closeModal,
      expenses,
    } = this.props;

    const catagories = getCatagoriesWithSubCatagories(expenses)
    console.log('catagories: ', catagories);
    console.log('expenses: ', expenses);

    return (
      <ReactModal className="ExpensesModal" isOpen={isOpen}>
      <div>
        <div className="ExpensesModal__content">Kies je uitgaven:</div>
        <Accordion atomic={true}>
          {this.renderCatagories(catagories)}
         </Accordion>
        <div className="ExpensesModal__closeButton">
          < MajorButton text="Modal sluiten" onClick={() => {closeModal('ExpensesModalOpen')}} />
        </div>
      </div>

      </ReactModal>
    );
  }
}

export default ExpensesModal;

ExpensesModal.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    catagory: PropTypes.string.isRequired,
    subcatagory: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    value: PropTypes.string,
  })).isRequired,
  selectExpenses: PropTypes.func.isRequired,
}