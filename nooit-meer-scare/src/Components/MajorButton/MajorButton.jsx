import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MajorButton.css';

class MajorButton extends Component {
  render() {
    const {
      onClick,
      text,
    } = this.props;

    return (
      <div>
        <button className={`majorButton majorButton--${this.props.colour}`} onClick={onClick}>{text}</button>
      </div>
    );
  }
}

MajorButton.DefaultProps = {
  colour: 'Blue',
}

MajorButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  colour: PropTypes.string
}

export default MajorButton;
