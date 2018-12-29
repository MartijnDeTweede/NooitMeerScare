import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../MonthlyBalanceTool/Table.css'

class SubcategoryLine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      //Forcibly overwrite input value to new default if the default ever changes
      this.setState({value: nextProps.value});
    }
  }

  render () {
    const {key, name, onBlur} = this.props;
    const {value} = this.state;
    return(
      <div className="Table__row" key={key}>
      <span className="Table__subcategory">{name}</span>
      <input
        className="Table__amount"
        type="number"
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={e => this.setState({value: e.target.value})}
      />
    </div>
    )
  }
};

SubcategoryLine.propTypes = {
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
}

export default SubcategoryLine;