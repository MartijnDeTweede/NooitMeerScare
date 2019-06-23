import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';

class SideMenu extends Component {
  render () {
    const {
      entries,
      onFileLoaded,
    } = this.props;

    return(
      <div>
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
  entries: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)),
  onFileLoaded: PropTypes.func,
}

SideMenu.defaultProps = {
  entries: {},
  onFileLoaded: null,
}

export default SideMenu;