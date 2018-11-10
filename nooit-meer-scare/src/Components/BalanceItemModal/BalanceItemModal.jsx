import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';
import './BalanceItemModal.css';
import {getCatagoriesWithSubCatagories} from '../Helpers/DataTransformations';
import { Accordion, AccordionItem } from 'react-light-accordion';
import './accordion.css';

class BalanceItemModal extends Component {

  renderCatagories = (catagories) => (
      Object.keys(catagories).map(category => (
            <AccordionItem title={category} key={category}>
            {catagories[category].map(subcategory => (
              <div key={subcategory.subcategory} className="BalanceItemModal__Subcategory">
                <label><input type="checkbox" className="BalanceItem__CheckBox" checked={subcategory.selected} onChange={(e) => this.props.selectBalanceItem(subcategory.subcategory, e.target.checked, this.props.balanceItems )} name={subcategory.subcategory} /> {subcategory.subcategory}</label> 
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
            <Accordion>
              {this.renderCatagories(catagories)}
            </Accordion>
          </div>

        <div className="BalanceItemModal__closeButton">
          < MajorButton colour="Blue" text="Modal sluiten" onClick={() => {closeModal(modalKey)}} />
        </div>
      </div>

      </ReactModal>
    );
  }
}

export default BalanceItemModal;

BalanceItemModal.Defaultprops = {
  colour: 'Blue'
}

BalanceItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  balanceItems: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    subcategory: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    value: PropTypes.string,
  })).isRequired,
  selectBalanceItem: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  modalKey: PropTypes.string,
  colour: PropTypes.string,
}