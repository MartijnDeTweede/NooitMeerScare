import React, { Component } from 'react';
import logo from '../Images/logo.svg';
import './App.css';
import MonthlyBalanceToolContainer from '../Containers/MonthlyBalanceToolContainer/MonthlyBalanceToolContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        < MonthlyBalanceToolContainer />
      </div>
    );
  }
}

export default App;
