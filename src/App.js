import React, { Component } from 'react';
import './App.css';
import Root from "./Root";
import { HashRouter } from 'react-router-dom';


class App extends Component {

  render() {
    return (
        <HashRouter>
                    <Root/>
        </HashRouter>
    );
  }
}

export default App;

