import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MajorButton.css';
import { CSVLink } from "react-csv";
import CSVReader from "react-csv-reader";
class MajorButton extends Component {
  render() {
    const {
      onClick,
      text,
      dataToDownload,
      onFileLoaded,
    } = this.props;

    if(dataToDownload) {
      return (
        <button className={`majorButton majorButton--${this.props.colour}`} onClick={onClick}>
          <CSVLink
            data={dataToDownload}
            separator={";"}
          >
          {text}
          </CSVLink>
        </button>
      )
    }

    if(onFileLoaded) {
      return (
        <CSVReader
        onFileLoaded={onFileLoaded}
      />
      )
    }

    return (
      <div>
        <button className={`majorButton majorButton--${this.props.colour}`} onClick={onClick}>{text}</button>
      </div>
    );
  }
}

MajorButton.DefaultProps = {
  colour: 'Blue',
  dataToDownload: null,
  onFileLoaded: null,
  onClick: null,
}

MajorButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  colour: PropTypes.string,
  dataToDownload: PropTypes.arrayOf(PropTypes.any),
  onFileLoaded: PropTypes.func,
}

export default MajorButton;
