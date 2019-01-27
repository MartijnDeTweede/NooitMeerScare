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
        <div>
          <button className={`majorButton majorButton--${this.props.colour}`} onClick={onClick}>
            <CSVLink
              data={dataToDownload}
              separator={";"}
              className="majorButton--CSVLink"
            >
            {text}
            </CSVLink>
          </button>
        </div>
      )
    }

    if(onFileLoaded) {
      return (
      <CSVReader
        cssClass= {`majorButton__label majorButton--${this.props.colour} majorButton--CSVReader`}
        onFileLoaded={onFileLoaded}
        label={text}
        />
  )
    }
    const classNames = this.props.inModal ? `majorButton majorButton--${this.props.colour} majorButton__Modal--mobile` : `majorButton majorButton--${this.props.colour}`;

    return (
      <div>
        <button className={classNames} onClick={onClick}>{text}</button>
      </div>
    );
  }
}

MajorButton.DefaultProps = {
  inModal: false,
  colour: 'Blue',
  dataToDownload: null,
  onFileLoaded: null,
  onClick: null,
}

MajorButton.propTypes = {
  inModal: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  colour: PropTypes.string,
  dataToDownload: PropTypes.arrayOf(PropTypes.any),
  onFileLoaded: PropTypes.func,
}

export default MajorButton;
