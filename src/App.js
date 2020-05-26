import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import Aux from './hoc/aux-div.js';
import Board from './containers/Board/Board';
import Sidebar from './containers/Sidebar/Sidebar';
import axios from './axios-data';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import * as actionFunctions from './store/actions/action-func';

class App extends React.Component {
  componentDidMount () {
    this.props.onInitBoards();
  }
  render() {
    return (    
      <Aux>
        <Sidebar />
        <Board />
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onInitBoards: () => dispatch(actionFunctions.initBoards())
    }
};

export default connect(null, mapDispatchToProps)(withErrorHandler( App, axios ));