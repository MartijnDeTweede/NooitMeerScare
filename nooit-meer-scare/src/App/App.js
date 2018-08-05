import React, { Component } from 'react';
import logo from '../Images/logo.svg';
import './App.css';
import MonthlyBalanceToolContainer from '../Containers/MonthlyBalanceToolContainer/MonthlyBalanceToolContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        < MonthlyBalanceToolContainer />
      </div>
    );
  }
}

export default App;
