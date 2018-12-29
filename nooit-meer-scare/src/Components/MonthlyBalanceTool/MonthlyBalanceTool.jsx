import React, { Component } from 'react';
import EntiesModal from '../EntriesModal/EntriesModal';
import MajorButton from '../MajorButton/MajorButton';
import SubcategoryLine from '../SubcategoryLine/SubcategoryLine';

import Entries from './entries.json';
import './monthlyBalanceTool.css';
import './Table.css';
import  { stringToFloat, getCatagoriesWithSubCatagories } from '../Helpers/DataTransformations';
import { Accordion, AccordionItem } from 'react-light-accordion';

class MonthlyBalanceTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ExpensesModalOpen: false,
      IncomesModalOpen: false,
      entries: Entries,
    }
  }

  openModal = (modalname) => {
    this.setState({ [modalname]: true });
  }

  closeModal = (modalname) => {
    this.setState({ [modalname]: false });
  }

  updateEntryForSubcategory = (subcategory, value, set) => {
    const inexOfElement = set.findIndex(object => object.subcategory === subcategory);
    set[inexOfElement].value = stringToFloat(value).toFixed(2);
    this.setState({...this.state, set});
  }

  renderCatagory = (catagories, entries) => (
    Object.keys(catagories).map(category => (
      <AccordionItem title={category} key={category}>
          {catagories[category].map(subcategory => (
            <SubcategoryLine
              key={subcategory.subcategory}
              name={subcategory.subcategory}
              value={subcategory.value}
              onBlur={(e) => this.updateEntryForSubcategory(subcategory.subcategory, e.target.value, entries)}
             />
          ))}
    </AccordionItem>
    ))
  )

  selectEntries = (subcategoryName, isChecked, set) => {
    const inexOfElement = set.findIndex(object => object.subcategory === subcategoryName);
    set[inexOfElement].selected = isChecked;
    this.setState( {...this.state, set});
  }

  onFileLoaded = (loadedData) => {
    // Shift to remove headers
    loadedData.shift();
    const entries = loadedData.map(array => ({
      type: array[0],
      category: array[1],
      subcategory: array[2],
      selected: array[3] === "true",
      value: array[4]
    }))

    this.setState({entries});
  }

  renderTotalAmountRow = (balanceMutations) => {
    const values = balanceMutations.map(balanceMutation => stringToFloat(balanceMutation.value));
    const total = values.reduce((a,b) => a+b,0).toFixed(2);
    const formatedTotal = total.replace(".", ",")
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
    const totalIncomes = parsedIncomes.reduce((a,b) => a+b,0).toFixed(2);
    const totalBalance = (totalIncomes - totalExpenses).toFixed(2);
    const formatedTotal = totalBalance.replace(".", ",");
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
        {this.renderCatagory(catagory, entries)}
      </Accordion>
      {this.renderTotalAmountRow(selectedItem)}
    </div>
  )}

  renderSideMenu = () => (
    <div className="Container__Menu">
    <MajorButton
      text="Kies uitgaven"
      onClick={() => {this.openModal('ExpensesModalOpen')}}
      colour="Red"
    />
    <MajorButton
      text="Kies inkomsten"
      onClick={() => {this.openModal('IncomesModalOpen')}}
      colour="Green"
    />

    <MajorButton
      text="Download als CSV"
      dataToDownload={this.state.entries}
      colour="Grey"
    />

    <MajorButton
      text="Importeer CSV"
      onFileLoaded={this.onFileLoaded}
      colour="Purple"
    />
  </div>
  )

  renderBerekenTool = () => {
    const { entries } = this.state;

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

  renderHeader = () => (
    <div className="Container__Header">
    </div>
  )

  renderRightAd = () => (
    <div className="Container__RightAd--DeskTop">
    </div>
  )

  render() {
    const { ExpensesModalOpen, IncomesModalOpen, entries } = this.state;
    return (
      <div>
        {this.renderHeader()}
        {this.renderSideMenu()}
        {this.renderBerekenTool()}
        {this.renderRightAd()}
        <EntiesModal
          modalKey="IncomesModalOpen"
          text="Kies je inkomsten"
          selectEntries={this.selectEntries}
          entries={entries.filter(entry => entry.type === 'income')}
          isOpen={IncomesModalOpen}
          closeModal={() => {this.closeModal('IncomesModalOpen')}}
          colour="Green"
        />
        <EntiesModal
          modalKey="ExpensesModalOpen"
          text="Kies je uitgaven"
          selectEntries={this.selectEntries}
          entries={entries.filter(entry => entry.type === 'expense')}
          isOpen={ExpensesModalOpen}
          closeModal={() => {this.closeModal('ExpensesModalOpen')}}
          colour="Red"
        />
      </div>
    );
  }
}

export default MonthlyBalanceTool;