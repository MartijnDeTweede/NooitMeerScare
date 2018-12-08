import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';
import './ImportModal.css';

class ImportModal extends Component {
  render() {

    const {
      isOpen,
      closeModal,
      text,
      modalKey
    } = this.props;

    return (
      <ReactModal className="ImportModal" isOpen={isOpen}>
      <div>
        <div className="ImportModal__content">{text}</div>
          Ik ben een tekst 2
        <div className="ImportModal__closeButton">
          < MajorButton colour={this.props.colour} text="Modal sluiten" onClick={() => {closeModal(modalKey)}} />
        </div>
      </div>

      </ReactModal>
    );
  }
}


ImportModal.Defaultprops = {
  colour: 'Blue'
}

ImportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  modalKey: PropTypes.string,
  colour: PropTypes.string,
}

export default ImportModal;