import React, { Component } from 'react';
import './App.css';
import { Link, Route, Switch} from  'react-router-dom'

import MonthlyBalanceToolContainer from '../Containers/MonthlyBalanceToolContainer/MonthlyBalanceToolContainer';
import AnualBalanceSheetContainer from '../Containers/AnualBalanceSheetContainer/AnualBalanceSheetContainer';

class App extends Component {
  render() {
    return (
      <div className="App">

        <ul>
          <li>
            <Link to="/huishoudboekje">Huishoudboekje</Link>
            <Link to="/jaarbalans">Jaarbalans</Link>
          </li>

        </ul>
        <Switch>
          <Route path="/huishoudboekje" component={MonthlyBalanceToolContainer} /> 
          <Route path="/jaarbalans" component={AnualBalanceSheetContainer} />          
        </Switch>

      </div>
    );
  }
}

export default App;
