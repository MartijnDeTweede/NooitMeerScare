import React from 'react';
import  { stringToFloat } from './DataTransformations';

export const renderTotalAmountRow = (balanceMutations) => {
  const values = balanceMutations.map(balanceMutation => stringToFloat(balanceMutation.value));
  const total = values.reduce((a,b) => a+b,0).toFixed(2);
  return (
    <div>
      <span>Totaal</span>
      <span>{total}</span>
    </div>
  )
}