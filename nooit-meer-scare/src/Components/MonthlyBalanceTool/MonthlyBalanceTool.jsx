import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EntiesModal from '../EntriesModal/EntriesModal';

import MonthlyBalanceToolForm from '../MonthlyBalanceToolForm/MonthlyBalanceToolForm';
import ThreeColumnSkeleton from '../ThreeColumnSkeleton/ThreeColumnSkeleton';
import ControlPanel from '../ControlPanelWithTotal/ControlPanelWithTotal';
import Analysistool from '../../Components/AnalysisTool/Analysistool';

import './monthlyBalanceTool.css';

class MonthlyBalanceTool extends Component {
  render() {
    const {
      ExpensesModalOpen,
      IncomesModalOpen,
      closeModal,
      entries,
      selectEntries,
      onFileLoaded,
      updateEntryForSubcategory,
      openModal,
      stage,
      wants,
      needs,
      savings,
      needsPercentage,
      wantsPercentage,
      savingsPercentage,
      analyze,
    } = this.props;

    return (
      <div>
        <ThreeColumnSkeleton>
          <ControlPanel entries={entries} onFileLoaded={onFileLoaded} analyze={
            analyze} />
          {
            stage === 'form' && <MonthlyBalanceToolForm
              entries={entries}
              updateEntryForSubcategory={updateEntryForSubcategory}
              openModal={openModal}
          />
          }
          {
            stage === 'analysis' && <Analysistool
              wants={wants}
              needs={needs}
              savings={savings}
              needsPercentage={needsPercentage}
              wantsPercentage={wantsPercentage}
              savingsPercentage={savingsPercentage}
            />
          }
          <div className="Container__RightAd--DeskTop" />
        </ThreeColumnSkeleton>
        <EntiesModal
          modalKey="IncomesModalOpen"
          text="Kies je inkomsten"
          selectEntries={selectEntries}
          entries={entries.filter(entry => entry.type === 'income')}
          isOpen={IncomesModalOpen}
          closeModal={() => {
            closeModal('IncomesModalOpen');
          }}
          colour="Green"
        />
        <EntiesModal
          modalKey="ExpensesModalOpen"
          text="Kies je uitgaven"
          selectEntries={selectEntries}
          entries={entries.filter(entry => entry.type === 'expense')}
          isOpen={ExpensesModalOpen}
          closeModal={() => {
            closeModal('ExpensesModalOpen');
          }}
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
};

export default MonthlyBalanceTool;
