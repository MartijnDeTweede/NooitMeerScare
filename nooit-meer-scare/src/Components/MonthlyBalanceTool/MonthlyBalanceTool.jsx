import React, { Component } from 'react';
import BalanceItemModal from '../BalanceItemModal/BalanceItemModal';
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
      <AccordionItem title={category}>
          {catagories[category].map(subcategory => (
            <div className="Table__row">
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

  render() {
    const { ExpensesModalOpen, IncomesModalOpen } = this.state;
    return (
      <div>
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
        </div>
        <div className="Container__Table">
          <div>
            {this.renderTable(this.state.expenses, "Uitgaven","Red")}
          </div>
          <div>
            {this.renderTable(this.state.incomes, "Inkomsten", "Green")}
          </div>
        </div>
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
      </div>
    );
  }
}

export default MonthlyBalanceTool;