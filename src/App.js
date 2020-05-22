import React from 'react';
import './App.css';
import Aux from './hoc/aux-div.js';
import Board from './containers/Board/Board';

class App extends React.Component {
  render (){
    return (    
    <Aux>
      <div>This works!!!</div> 
      <Board />
      </Aux>
    );
  }
}

export default App;
