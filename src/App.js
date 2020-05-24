import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import Aux from './hoc/aux-div.js';
import Board from './containers/Board/Board';

class App extends React.Component {
  componentDidMount () {
    console.log(this.props); 
    this.props.onInitIngredients();
  }

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
