import React, { Component } from 'react';
import { string, number } from 'prop-types';
import './ResultsBlock.css';

class ResultsBlock extends Component {
  render() {
    const {
      title,
      value,
      percentage,
    } = this.props;
    return (
      <div className="resultBlock">
        <span className="resultBlock__title">{title}</span><span className="resultBlock__value">{value}</span><span className="resultBlock__percentage">{percentage*100}%</span>
      </div>
    )
  }
}

ResultsBlock.propTypes = {
  title: string.isRequired,
  value: number.isRequired,
  percentage: number.isRequired,
};

export default ResultsBlock;
