import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  { stringToFloat, getCatagoriesWithSubCatagories } from '../../Helpers/DataTransformations';
import { Accordion, AccordionItem } from 'react-light-accordion';
import SubcategoryLine from '../SubcategoryLine/SubcategoryLine';

import './Table.css';
import './MonthlyBalanceToolForm.css';

class MonthlyBalanceToolForm extends Component {
  renderCatagory = (catagories) => (
    Object.keys(catagories).map(category => (
      <AccordionItem title={category} key={category}>
          {catagories[category].map(subcategory => (
            <SubcategoryLine
              key={subcategory.subcategory}
              name={subcategory.subcategory}
              value={subcategory.value}
              onBlur={(e) => this.props.updateEntryForSubcategory(subcategory.subcategory, e.target.value)}
             />
          ))}
    </AccordionItem>
    ))
  )

  renderTotalAmountRow = (entries) => {
    const values = entries.map(balanceMutation => stringToFloat(balanceMutation.value));
    const formatedTotal = values.reduce((a,b) => a+b,0).toFixed(2).replace(".", ",")
    return (
      <div className="Table__row Table__row--Total">
        <span className="Table__subcategory">Totaal</span>
        <input className="Table__amount" disabled value={formatedTotal} />
      </div>
    )
  }


  renderTable = (entries, headertext, colour, modalName) => {
    const { openModal } = this.props;
    const selectedItem = entries.filter(item => item.selected);
    const catagory = getCatagoriesWithSubCatagories(selectedItem);
    return (
    <div className="Table">
      <div className={`Table__row Table__row--Header Table__row--Header--${colour}`} onClick={() => openModal(modalName)}>{headertext}</div>
      <Accordion>
        {this.renderCatagory(catagory)}
      </Accordion>
      {this.renderTotalAmountRow(selectedItem)}
    </div>
  )}

  render() {
    const { entries } = this.props;
    return (
      <div>
        <div className="MonthlyBalanceToolForm_TableContainer">
          {this.renderTable(entries.filter(entry => entry.type === 'expense'), "Uitgaven","Red", "ExpensesModalOpen")}
          {this.renderTable(entries.filter(entry => entry.type === 'income'), "Inkomsten", "Green", "IncomesModalOpen")}
        </div>
      </div>
    );
  }
}


MonthlyBalanceToolForm.PropTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default MonthlyBalanceToolForm;