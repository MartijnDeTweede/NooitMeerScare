import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  { stringToFloat, getCatagoriesWithSubCatagories } from '../../Helpers/DataTransformations';
import { Accordion, AccordionItem } from 'react-light-accordion';

import EntiesModal from '../EntriesModal/EntriesModal';
import MajorButton from '../MajorButton/MajorButton';
import SubcategoryLine from '../SubcategoryLine/SubcategoryLine';

import './monthlyBalanceTool.css';
import './Table.css';

class MonthlyBalanceTool extends Component {
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

  renderBalanceTotalAmountRow = (entries) => {
    // To Do fix
    const parsedExpenses = entries.filter(entry => entry.type === 'expense').map(expense => stringToFloat(expense.value));
    const parsedIncomes = entries.filter(entry => entry.type === 'income').map(income => stringToFloat(income.value));
    const totalExpenses = parsedExpenses.reduce((a,b) => a+b,0).toFixed(2);
    const totalIncome = parsedIncomes.reduce((a,b) => a+b,0).toFixed(2);
    const formatedTotal = (totalIncome - totalExpenses).toFixed(2).replace(".", ",");
    return (
      <div className="Table__row Table__row--Total">
        <span className="Table__subcategory">Totaal</span>
        <input className="Table__amount" disabled value={formatedTotal} />
      </div>
    )
  }

  renderTable = (entries, headertext, colour) => {
    const selectedItem = entries.filter(item => item.selected);
    const catagory = getCatagoriesWithSubCatagories(selectedItem);
    return (
    <div className="Table">
      <div className={`Table__row Table__row--Header Table__row--Header--${colour}`}>{headertext}</div>
      <Accordion>
        {this.renderCatagory(catagory)}
      </Accordion>
      {this.renderTotalAmountRow(selectedItem)}
    </div>
  )}

  renderSideMenu = () => (
    <div className="Container__Menu">
    <MajorButton
      text="Kies uitgaven"
      onClick={() => {this.props.openModal('ExpensesModalOpen')}}
      colour="Red"
    />
    <MajorButton
      text="Kies inkomsten"
      onClick={() => {this.props.openModal('IncomesModalOpen')}}
      colour="Green"
    />

    <MajorButton
      text="Download als CSV"
      dataToDownload={this.props.entries}
      colour="Grey"
    />

    <MajorButton
      text="Importeer CSV"
      onFileLoaded={this.props.onFileLoaded}
      colour="Blue"
    />
  </div>
  )

  renderBerekenTool = () => {
    const { entries } = this.props;

    return (
      <div className="Container__Table">
      <div>
        {this.renderTable(entries.filter(entry => entry.type === 'expense'), "Uitgaven","Red")}
      </div>
      <div>
        {this.renderTable(entries.filter(entry => entry.type === 'income'), "Inkomsten", "Green")}
      </div>
      <div className="Table">
        <div className={`Table__row Table__row--Header Table__row--Header--Blue`}>Totaal</div>
        {this.renderBalanceTotalAmountRow(entries)}
      </div>
    </div>
    );
  }

  renderRightAd = () => (
    <div className="Container__RightAd--DeskTop">
    </div>
  )

  render() {
    const {
      ExpensesModalOpen,
      IncomesModalOpen,
      closeModal,
      entries,
      selectEntries,
    } = this.props;
    return (
      <div>
        {this.renderSideMenu()}
        {this.renderBerekenTool()}
        {/* {this.renderRightAd()} */}
        <EntiesModal
          modalKey="IncomesModalOpen"
          text="Kies je inkomsten"
          selectEntries={selectEntries}
          entries={entries.filter(entry => entry.type === 'income')}
          isOpen={IncomesModalOpen}
          closeModal={() => {closeModal('IncomesModalOpen')}}
          colour="Green"
        />
        <EntiesModal
          modalKey="ExpensesModalOpen"
          text="Kies je uitgaven"
          selectEntries={selectEntries}
          entries={entries.filter(entry => entry.type === 'expense')}
          isOpen={ExpensesModalOpen}
          closeModal={() => {closeModal('ExpensesModalOpen')}}
          colour="Red"
        />
      </div>
    );
  }
}

MonthlyBalanceTool.propTypes = {
  ExpensesModalOpen: PropTypes.bool.isRequired,
  IncomesModalOpen: PropTypes.bool.isRequired,
  entries: PropTypes.shape(PropTypes.any),
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateEntryForSubcategory: PropTypes.func.isRequired,
  selectEntries: PropTypes.func.isRequired,
  onFileLoaded: PropTypes.func.isRequired,
}

export default MonthlyBalanceTool;