import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';
import './ExportModal.css';

class ExportModal extends Component {
  render() {

    const {
      isOpen,
      closeModal,
      text,
      modalKey
    } = this.props;

    return (
      <ReactModal className="ExportModal" isOpen={isOpen}>
      <div>
        <div className="ExportModal__content">{text}</div>
          Ik ben een tekst
        <div className="ExportModal__closeButton">
          < MajorButton colour={this.props.colour} text="Modal sluiten" onClick={() => {closeModal(modalKey)}} />
        </div>
      </div>

      </ReactModal>
    );
  }
}


ExportModal.Defaultprops = {
  colour: 'Blue'
}

ExportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  modalKey: PropTypes.string,
  colour: PropTypes.string,
}

export default ExportModal;