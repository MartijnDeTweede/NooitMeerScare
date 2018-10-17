import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';
import './BalanceItemModal.css';
import {getCatagoriesWithSubCatagories} from '../Helpers/DataTransformations';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

class BalanceItemModal extends Component {

  renderCatagories = (catagories) => (
      Object.keys(catagories).map(catagory => (
      <AccordionItem title={catagory}>
      {catagories[catagory].map(subcatagory => (
        <div>
          <input type="checkbox" checked={subcatagory.selected} onChange={(e) => this.props.selectBalanceItem(subcatagory.subcatagory, e.target.checked, this.props.balanceItems )} name={subcatagory.subcatagory} /> {subcatagory.subcatagory} 
        </div>
      ))}
    </AccordionItem>
    ))
  )

  render() {
    const {
      isOpen,
      closeModal,
      balanceItems,
      text,
      modalKey
    } = this.props;

    const catagories = getCatagoriesWithSubCatagories(balanceItems)
    
    return (
      <ReactModal className="BalanceItemModal" isOpen={isOpen}>
      <div>
        <div className="BalanceItemModal__content">{text}</div>
        <Accordion atomic={true}>
          {this.renderCatagories(catagories)}
         </Accordion>
        <div className="BalanceItemModal__closeButton">
          < MajorButton text="Modal sluiten" onClick={() => {closeModal(modalKey)}} />
        </div>
      </div>

      </ReactModal>
    );
  }
}

export default BalanceItemModal;

BalanceItemModal.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  balanceItems: PropTypes.arrayOf(PropTypes.shape({
    catagory: PropTypes.string.isRequired,
    subcatagory: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    value: PropTypes.string,
  })).isRequired,
  selectBalanceItem: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  modalKey: PropTypes.modalKey
}