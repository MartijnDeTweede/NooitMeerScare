import React from 'react';
import  { stringToFloat } from './DataTransformations';

export const renderTotalAmountRow = (balanceMutations) => {
  const values = balanceMutations.map(balanceMutation => stringToFloat(balanceMutation.value));
  const total = values.reduce((a,b) => a+b,0).toFixed(2);
  return (
    <tr>
      <td>Totaal</td>
      <td></td>
      <td>{total}</td>
    </tr>
  )
}

export const renderHeaders = (headerData) => (
  <tr>
    {headerData.map(header => (
      <th key={header.id}>{header.value}</th>        
    ))}
  </tr>
)