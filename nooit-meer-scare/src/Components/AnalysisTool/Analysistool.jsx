import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ThreeColumnSkeleton from '../ThreeColumnSkeleton/ThreeColumnSkeleton';
import MajorButton from '../../Components/MajorButton/MajorButton';
import ResultsBlock from '../ResultsBlock/ResultsBlock';



class Analysistool extends Component {
  render() {
    const { onFileLoaded, wants, needs, savings, totalIncome, needsPercentage, wantsPercentage, savingsPercentage } = this.props;
    return (
      <div>
        <ThreeColumnSkeleton>
          <MajorButton
            text="Importeer CSV"
            onFileLoaded={onFileLoaded}
            colour="Blue"
          />
          <div>
          {
            needs && <ResultsBlock title="Needs" value={needs} percentage={needsPercentage} />
          }
          {
            wants && <ResultsBlock title="Wants" value={wants} percentage={wantsPercentage} />
          }
          {
            savings && <ResultsBlock title="Savings" value={savings} percentage={savingsPercentage} />
          }
          {
            totalIncome && <div> Totaal inkomen: {totalIncome} </div>
          }
          </div>
          <div className="Container__RightAd--DeskTop" />
        </ThreeColumnSkeleton>
      </div>
    );
  }
}

Analysistool.propTypes = {
  ExpensesModalOpen: PropTypes.bool.isRequired,
  IncomesModalOpen: PropTypes.bool.isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)).isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateEntryForSubcategory: PropTypes.func.isRequired,
  selectEntries: PropTypes.func.isRequired,
  onFileLoaded: PropTypes.func.isRequired,
};

export default Analysistool;
