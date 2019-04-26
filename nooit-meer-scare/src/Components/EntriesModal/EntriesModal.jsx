import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';
import './EntriesModal.css';
import {getCatagoriesWithSubCatagories} from '../../Helpers/DataTransformations';

import { Accordion, AccordionItem } from 'react-light-accordion';
import './accordion.css';

class EntriesModal extends Component {

  renderCatagories = (catagories) => (
      Object.keys(catagories).map(category => (
            <AccordionItem title={category} key={category}>
            {catagories[category].map(subcategory => (
              <div key={subcategory.subcategory} className="EntriesModal__Subcategory">
                <label><input type="checkbox" className="Entries__CheckBox" checked={subcategory.selected} onChange={(e) => this.props.selectEntries(subcategory.subcategory, e.target.checked)} name={subcategory.subcategory} /> {subcategory.subcategory}</label> 
              </div>
            ))}
          </AccordionItem>
    ))
  )

  render() {
    const {
      isOpen,
      closeModal,
      entries,
      text,
      modalKey
    } = this.props;

    const catagories = getCatagoriesWithSubCatagories(entries)

    return (
      <ReactModal className="EntriesModal" isOpen={isOpen}>
      <div>
        <div className="EntriesModal__content">{text}
          <div className="EntriesModal__Categorybox">
            <Accordion>
              {this.renderCatagories(catagories)}
            </Accordion>
          </div>
        < MajorButton inModal colour={this.props.colour} text="Modal sluiten" onClick={() => {closeModal(modalKey)}} />
        </div>
      </div>

      </ReactModal>
    );
  }
}

export default EntriesModal;

EntriesModal.Defaultprops = {
  colour: 'Blue'
}

EntriesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    subcategory: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    value: PropTypes.string,
  })).isRequired,
  selectEntries: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  modalKey: PropTypes.string,
  colour: PropTypes.string,
}