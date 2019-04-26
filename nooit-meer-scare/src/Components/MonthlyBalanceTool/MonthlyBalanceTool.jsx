import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EntiesModal from '../EntriesModal/EntriesModal';
import SideMenu from '../SideMenu/SideMenu';
import MonthlyBalanceToolForm from '../MonthlyBalanceToolForm/MonthlyBalanceToolForm';

import './monthlyBalanceTool.css';

class MonthlyBalanceTool extends Component {
  renderSideMenu = () => {
    const {
      openModal,
      entries,
      onFileLoaded,
    } = this.props;

    return ( 
      <div className="Column">
        <SideMenu
          openModal={openModal}
          entries={entries}
          onFileLoaded={onFileLoaded} />
      </div>
    )
  }


  renderBerekenTool = () => {
    const {
      entries,
      updateEntryForSubcategory,
    } = this.props;
    return (
      <MonthlyBalanceToolForm
      entries={entries}
      updateEntryForSubcategory= {updateEntryForSubcategory}
      />
    )
  }

  renderRightAd = () => (
    <div className="Column Container__RightAd--DeskTop">
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
      <div className='Container'>
        {this.renderSideMenu()}
        {this.renderBerekenTool()}
        {this.renderRightAd()}
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
  entries: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)).isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateEntryForSubcategory: PropTypes.func.isRequired,
  selectEntries: PropTypes.func.isRequired,
  onFileLoaded: PropTypes.func.isRequired,
}

export default MonthlyBalanceTool;