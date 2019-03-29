import React, { Component } from 'react';
import './App.css';
import Root from "./Root";
import { BrowserRouter } from 'react-router-dom';


class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Root/>
        </BrowserRouter>
    );
  }
}

export default App;

