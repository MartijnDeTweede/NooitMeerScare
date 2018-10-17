import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';
import './IncomesModal.css';
import {getCatagoriesWithSubCatagories} from '../Helpers/DataTransformations';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

class IncomesModal extends Component {

  renderCatagories = (catagories) => (
      Object.keys(catagories).map(catagory => (
      <AccordionItem title={catagory}>
      {catagories[catagory].map(subcatagory => (
        <div>
          <input type="checkbox" checked={subcatagory.selected} onChange={(e) => this.props.selectBalanceItem(subcatagory.subcatagory, e.target.checked, this.props.incomes)} name={subcatagory.subcatagory} /> {subcatagory.subcatagory} 
        </div>
      ))}
    </AccordionItem>
    ))
  )

  render() {
    const {
      isOpen,
      closeModal,
      incomes,
    } = this.props;

    const catagories = getCatagoriesWithSubCatagories(incomes)

    return (
      <ReactModal className="IncomesModal" isOpen={isOpen}>
      <div>
        <div className="IncomesModal__content">Kies je inkomsten:</div>
        <Accordion atomic={true}>
          {this.renderCatagories(catagories)}
         </Accordion>
        <div className="IncomesModal__closeButton">
          < MajorButton text="Modal sluiten" onClick={() => {closeModal('IncomesModalOpen')}} />
        </div>
      </div>

      </ReactModal>
    );
  }
}

export default IncomesModal;

IncomesModal.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  incomes: PropTypes.arrayOf(PropTypes.shape({
    catagory: PropTypes.string.isRequired,
    subcatagory: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    value: PropTypes.string,
  })).isRequired,
  selectBalanceItem: PropTypes.func.isRequired,
}