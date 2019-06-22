import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MajorButton from '../MajorButton/MajorButton';

class SideMenu extends Component {
  render() {
    const { entries, onFileLoaded, handleAnalysisClick } = this.props;

    return (
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
        <MajorButton
          text="Analyseer"
          onClick={handleAnalysisClick}
          colour="Orange"
        />
      </div>
    );
  }
}

SideMenu.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)),
  onFileLoaded: PropTypes.func,
  handleAnalysisClick: PropTypes.func,
};

SideMenu.defaultProps = {
  entries: {},
  onFileLoaded: null,
  handleAnalysisClick: null,
};

export default SideMenu;
