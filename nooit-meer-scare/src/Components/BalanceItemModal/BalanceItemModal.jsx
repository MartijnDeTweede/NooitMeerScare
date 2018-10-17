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
      Object.keys(catagories).map(category => (
      <AccordionItem title={category}>
      {catagories[category].map(subcategory => (
        <div>
          <input type="checkbox" checked={subcategory.selected} onChange={(e) => this.props.selectBalanceItem(subcategory.subcategory, e.target.checked, this.props.balanceItems )} name={subcategory.subcategory} /> {subcategory.subcategory} 
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
          <div className="BalanceItemModal__Categorybox">
            <Accordion atomic={true}>
              {this.renderCatagories(catagories)}
            </Accordion>            
          </div>

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
    category: PropTypes.string.isRequired,
    subcategory: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    value: PropTypes.string,
  })).isRequired,
  selectBalanceItem: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  modalKey: PropTypes.modalKey
}