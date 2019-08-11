import React, { Component } from 'react';
import SearchComp from './SearchComp'
import logo from './logo.svg';
import './App.css';
import data from './data.json'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="search-comp">
          <h2>Start typing</h2>
          <SearchComp
            suggestions={data}
          />
        </div>
      </div>
    );
  }
}

export default App;
