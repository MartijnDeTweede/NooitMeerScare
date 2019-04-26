import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';

class SideMenu extends Component {
  render () {
    const {
      openModal,
      entries,
      onFileLoaded,
    } = this.props;

    return(
      <div>
      <MajorButton
        text="Kies uitgaven"
        onClick={() => {openModal('ExpensesModalOpen')}}
        colour="Red"
      />
      <MajorButton
        text="Kies inkomsten"
        onClick={() => {openModal('IncomesModalOpen')}}
        colour="Green"
      />

      <MajorButton
        text="Download als CSV"
        dataToDownload={entries}
        colour="Grey"
      />

      <MajorButton
        text="Importeer CSV"
        onFileLoaded={onFileLoaded}
        colour="Blue"
      />
      </div>
    )
  }
}

SideMenu.propTypes = {
  openModal: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)),
  onFileLoaded: PropTypes.func,
}

SideMenu.defaultProps = {
  entries: {},
  onFileLoaded: null,
}

export default SideMenu;