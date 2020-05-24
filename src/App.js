import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import Aux from './hoc/aux-div.js';
import Board from './containers/Board/Board';
import * as actionFunction from './store/actions/action-func';
import axios from './axios-data';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';

class App extends React.Component {
  componentDidMount () {
    this.props.onInitBoards();
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

const mapDispatchToProps = dispatch => {
  return {
    onInitBoards: () => dispatch(actionFunction.initBoards())
  }
}
export default connect(null, mapDispatchToProps)(withErrorHandler( App, axios ));