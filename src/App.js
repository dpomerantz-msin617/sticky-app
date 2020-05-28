import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import Aux from './hoc/aux-div.js';
import Board from './containers/Board/Board';
import BoardNames from './containers/BoardNames/BoardNames';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import Sidebar from './components/Navigation/SideBar/SideBar';
import axios from './axios-data';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import * as actionFunctions from './store/actions/action-func';

class App extends React.Component {
  componentDidMount () {
    this.props.onInitBoards();
  }
  state = {
    showSideBar: false
  };
  SideBarClosedHandler = () => {
      this.setState({showSideBar: false});
  };
  SideBarToggleHandler = () => {
      this.setState((prevState) => {
          return {showSideBar: !this.state.showSideBar};
      });
  }
  render() {
    // const sideBar = (this.state.showSideBar) ?
    //          <SideBar open={this.state.showSideBar} closed={this.SideBarClosedHandler}>
    //               <Sidebar/>
    //             </SideBar> :
    //           <Sidebar/>
    return (    
      <Aux>
        <Toolbar drawerToggleClicked={this.SideBarToggleHandler}/>
        <Sidebar open={this.state.showSideBar} closed={this.SideBarClosedHandler}>
          <BoardNames />
        </Sidebar>
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