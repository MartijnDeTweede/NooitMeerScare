import React, { Component } from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';

import MonthlyBalanceToolContainer from '../Containers/MonthlyBalanceToolContainer/MonthlyBalanceToolContainer';
import AnualBalanceSheetContainer from '../Containers/AnualBalanceSheetContainer/AnualBalanceSheetContainer';
import BuyCarContainer from '../Containers/BuyCarContainer/BuyCarContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-header__logo" />
          <Link
            className=" App-header__link App-header__link--first"
            to="/huishoudboekje"
          >
            Huishoudboekje
          </Link>
          <Link className="App-header__link" to="/auto-kopen-anayse">
            Nieuwe auto
          </Link>
          <Link className="App-header__link" to="/jaarbalans">
            Jaarbalans
          </Link>

          <div className="App-header__menu--mobile">Toon menu</div>
        </div>
        <Switch>
          <Route
            path="/huishoudboekje"
            component={MonthlyBalanceToolContainer}
          />
          <Route path="/auto-kopen-anayse" component={BuyCarContainer} />
          <Route path="/jaarbalans" component={AnualBalanceSheetContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
