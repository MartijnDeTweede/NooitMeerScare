import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';

class ExpensesModal extends Component {
  render() {
    const {
      isOpen,
      closeModal,
    } = this.props;

    return (
      <ReactModal isOpen={isOpen}>
        <div>Dit is een modal</div>
        < MajorButton text="Modal sluiten" onClick={() => {closeModal('ExpensesModalOpen')}} />
      </ReactModal>
    );
  }
}

export default ExpensesModal;

ExpensesModal.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}