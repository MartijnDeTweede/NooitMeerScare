import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MajorButton extends Component {
  render() {
    const {
      onClick,
      text,
    } = this.props;

    return (
      <div>
        <button onClick={onClick}>{text}</button>
      </div>
    );
  }
}

export default MajorButton;

MajorButton.PropTypes = {
  text: PropTypes.string.isRequired,
  onCLick: PropTypes.func.isRequired,
}

