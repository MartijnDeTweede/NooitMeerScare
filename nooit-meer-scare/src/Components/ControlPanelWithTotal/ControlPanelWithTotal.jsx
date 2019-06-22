import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideMenu from '../SideMenu/SideMenu';
import { stringToFloat } from '../../Helpers/DataTransformations';

import '../MonthlyBalanceToolForm/Table.css';
import './ControlPanelWithTotal.css';

class ControlPanel extends Component {
  renderBalanceTotalAmountRow = entries => {
    // To Do fix
    const parsedExpenses = entries
      .filter(entry => entry.type === 'expense')
      .map(expense => stringToFloat(expense.value));
    const parsedIncomes = entries
      .filter(entry => entry.type === 'income')
      .map(income => stringToFloat(income.value));
    const totalExpenses = parsedExpenses.reduce((a, b) => a + b, 0).toFixed(2);
    const totalIncome = parsedIncomes.reduce((a, b) => a + b, 0).toFixed(2);
    const formatedTotal = (totalIncome - totalExpenses)
      .toFixed(2)
      .replace('.', ',');
    return (
      <div className="Table__row Table__row--Total">
        <span className="Table__subcategory">Totaal</span>
        <input className="Table__amount" disabled value={formatedTotal} />
      </div>
    );
  };

  render() {
    const { entries, onFileLoaded, handleAnalysisClick } = this.props;
    return (
      <div>
        <div className="ControlPanel__Sidemenu">
          <SideMenu
            entries={entries}
            onFileLoaded={onFileLoaded}
            handleAnalysisClick={handleAnalysisClick}
          />
        </div>
        <div className="Table">
          <div
            className={`Table__row Table__row--Header Table__row--Header--Blue`}
          >
            Totaal
          </div>
          {this.renderBalanceTotalAmountRow(entries)}
        </div>
      </div>
    );
  }
}

ControlPanel.defaultProps = {
  entries: {},
  onFileLoaded: null,
  handleAnalysisClick: null,
};

ControlPanel.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)),
  onFileLoaded: PropTypes.func,
  handleAnalysisClick: PropTypes.func,
};

export default ControlPanel;
