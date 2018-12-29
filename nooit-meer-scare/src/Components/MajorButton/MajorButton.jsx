import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MajorButton.css';
import { CSVLink } from "react-csv";

class MajorButton extends Component {
  render() {
    const {
      onClick,
      text,
      dataToDownload,
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
}

MajorButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  colour: PropTypes.string,
  dataToDownload: PropTypes.shape(PropTypes.any),
}

export default MajorButton;
