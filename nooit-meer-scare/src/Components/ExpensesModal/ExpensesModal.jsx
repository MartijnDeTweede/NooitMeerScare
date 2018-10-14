import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';
import './ExpensesModal.css';

class ExpensesModal extends Component {
  render() {
    const {
      isOpen,
      closeModal,
    } = this.props;

    return (
      <ReactModal className="ExpensesModal" isOpen={isOpen}>
      <div>
        <div className="ExpensesModal__content">Kies je uitgaven:</div>
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
}