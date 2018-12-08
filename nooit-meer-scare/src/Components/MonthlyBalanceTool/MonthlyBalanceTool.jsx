import React, { Component } from 'react';
import BalanceItemModal from '../BalanceItemModal/BalanceItemModal';
import ExportModal from '../ExportModal/ExportModal';
import ImportModal from '../ImportModal/ImportModal';
import MajorButton from '../MajorButton/MajorButton';

import Expenses from './expenses.json';
import Incomes from './incomes.json';
import './monthlyBalanceTool.css';
import  { stringToFloat, getCatagoriesWithSubCatagories } from '../Helpers/DataTransformations';
import { Accordion, AccordionItem } from 'react-light-accordion';

class MonthlyBalanceTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ExpensesModalOpen: false,
      IncomesModalOpen: false,
      ExportJSONModalOpen: false,
      ImportJSONModalOpen: false,
      expenses: Expenses,
      incomes: Incomes,
    }
  }

  openModal = (modalname) => {
    this.setState({ [modalname]: true });
  }

  closeModal = (modalname) => {
    this.setState({ [modalname]: false });
  }

  updateBalanceItemForSubcategory = (subcategory, value, set) => {
    const inexOfElement = set.findIndex(object => object.subcategory === subcategory);
    set[inexOfElement].value = stringToFloat(value).toFixed(2);
    this.setState({...this.state, set});
  }

  renderCatagory = (catagories, balanceItems) => (
    Object.keys(catagories).map(category => (
      <AccordionItem title={category} key={category}>
          {catagories[category].map(subcategory => (
            <div className="Table__row" key={subcategory.subcategory}>
              <span className="Table__subcategory">{subcategory.subcategory}</span>
              <input className="Table__amount" type="number" name={subcategory.subcategory} defaultValue={subcategory.value} onBlur={(e) => this.updateBalanceItemForSubcategory(subcategory.subcategory, e.target.value, balanceItems)}/>
            </div>
          ))}
    </AccordionItem>
    ))
  )

  selectBalanceItem = (subcategoryName, isChecked, set) => {
    const inexOfElement = set.findIndex(object => object.subcategory === subcategoryName);
    set[inexOfElement].selected = isChecked;
    this.setState( {...this.state, set});
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

  renderBalanceTotalAmountRow = (expenses, incomes) => {
    const parsedExpenses = expenses.map(expense => stringToFloat(expense.value));
    const parsedIncomes = incomes.map(income => stringToFloat(income.value));
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

  renderTable = (balanceItems, headertext, colour) => {
    const selectedItem = balanceItems.filter(item => item.selected);
    const catagory = getCatagoriesWithSubCatagories(selectedItem);
    return (
    <div className="Table">
      <div className={`Table__row Table__row--Header Table__row--Header--${colour}`}>{headertext}</div>
      <Accordion>
        {this.renderCatagory(catagory, balanceItems)}
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
      text="Exporteer JSON"
      onClick={() => {this.openModal('ExportJSONModalOpen')}}
      colour="Grey"
    />
    <MajorButton
      text="Importeer JSON"
      onClick={() => {this.openModal('ImportJSONModalOpen')}}
      colour="Purple"
    />
  </div>
  )

  renderBerekenTool = () => {
    const { incomes, expenses } = this.state;
    return (
      <div className="Container__Table">
      <div>
        {this.renderTable(expenses, "Uitgaven","Red")}
      </div>
      <div>
        {this.renderTable(incomes, "Inkomsten", "Green")}
      </div>
      <div className="Table">
        <div className={`Table__row Table__row--Header Table__row--Header--Blue`}>Totaal</div>
        {this.renderBalanceTotalAmountRow(expenses, incomes)}
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
    const { ExpensesModalOpen, IncomesModalOpen, ExportJSONModalOpen, ImportJSONModalOpen } = this.state;
    return (
      <div>
        {this.renderHeader()}
        {this.renderSideMenu()}
        {this.renderBerekenTool()}
        {this.renderRightAd()}
        <BalanceItemModal
          modalKey="IncomesModalOpen"
          text="Kies je inkomsten"
          selectBalanceItem={this.selectBalanceItem}
          balanceItems={this.state.incomes}
          isOpen={IncomesModalOpen}
          closeModal={() => {this.closeModal('IncomesModalOpen')}}
          colour="Green"
        />
        <BalanceItemModal
          modalKey="ExpensesModalOpen"
          text="Kies je uitgaven"
          selectBalanceItem={this.selectBalanceItem}
          balanceItems={this.state.expenses}
          isOpen={ExpensesModalOpen}
          closeModal={() => {this.closeModal('ExpensesModalOpen')}}
          colour="Red"
        />
        <ExportModal
          modalKey="ExportJSONModalOpen"
          text="Kies de plek waar naar je wilt exporteren"
          isOpen={ExportJSONModalOpen}
          closeModal={() => {this.closeModal('ExportJSONModalOpen')}}
          colour="Blue"
        />
        <ImportModal
          modalKey="ImportJSONModalOpen"
          text="Kies de plek van waar je wilt importeren"
          isOpen={ImportJSONModalOpen}
          closeModal={() => {this.closeModal('ImportJSONModalOpen')}}
          colour="Blue"
        />
      </div>
    );
  }
}

export default MonthlyBalanceTool;