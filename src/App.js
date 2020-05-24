import React from 'react';
import './App.css';
import Aux from './hoc/aux-div.js';
import Board from './containers/Board/Board';
import axios from './axios-data';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';

class App extends React.Component {

  render() {
    return (    
      <Aux>
       <Board />
      </Aux>
    );
  }
}

export default withErrorHandler( App, axios );