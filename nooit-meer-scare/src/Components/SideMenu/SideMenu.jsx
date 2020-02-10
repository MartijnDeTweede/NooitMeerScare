import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';

class SideMenu extends Component {
  render () {
    const {
      entries,
      onFileLoaded,
      analyze,
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
        colour="Grey"
      />
      <MajorButton
        text="Analyseer"
        onClick={analyze}
        colour="Blue"
      />
      </div>
    )
  }
}

SideMenu.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)),
  onFileLoaded: PropTypes.func,
  analyze: PropTypes.func,
}

SideMenu.defaultProps = {
  entries: {},
  onFileLoaded: null,
  analyze: null,
}

export default SideMenu;