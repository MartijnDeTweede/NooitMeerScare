import React, { Component } from 'react';
import BalanceItemModal from '../BalanceItemModal/BalanceItemModal';
import MajorButton from '../MajorButton/MajorButton';
import Expenses from './expenses.json';
import Incomes from './incomes.json';
import './monthlyBalanceTool.css';
import { renderTotalAmountRow } from '../Helpers/TableHelpers';
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
            <div>
              <span className="Table__subCatagory">{subcategory.subcategory}</span>
              <span className="Table__Ammount">
                <input type="number" name={subcategory.subcategory} defaultValue={subcategory.value} onBlur={(e) => this.updateBalanceItemForSubcategory(subcategory.subcategory, e.target.value, balanceItems)}/>
              </span>
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

  renderTable = (balanceItems) => {
    const selectedItem = balanceItems.filter(item => item.selected);
    const catagory = getCatagoriesWithSubCatagories(selectedItem);
    return (
    <div>
      <Accordion>
        {this.renderCatagory(catagory, balanceItems)}
      </Accordion>
      {renderTotalAmountRow(selectedItem)}
    </div>
  )}

  render() {
    const { ExpensesModalOpen, IncomesModalOpen } = this.state;
    return (
      <div>
        Dit is de monthlyBalancetool
        <div>
        <div>Uitgaven</div>
        {this.renderTable(this.state.expenses)}
        <div>Inkomsten</div>
        {this.renderTable(this.state.incomes)}
        </div>

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