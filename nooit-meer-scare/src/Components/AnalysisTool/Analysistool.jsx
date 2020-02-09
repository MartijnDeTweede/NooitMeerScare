import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ThreeColumnSkeleton from '../ThreeColumnSkeleton/ThreeColumnSkeleton';
import MajorButton from '../../Components/MajorButton/MajorButton';

class Analysistool extends Component {
  render() {
    const { onFileLoaded } = this.props;
    return (
      <div>
        <ThreeColumnSkeleton>
          <MajorButton
            text="Importeer CSV"
            onFileLoaded={onFileLoaded}
            colour="Blue"
          />
          <div>Hier komt de form</div>
          <div>50-30-20</div>
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
