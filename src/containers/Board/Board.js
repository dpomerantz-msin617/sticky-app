import React from 'react';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

import List from '../List/List';
import classes from './Board.module.css';

const board = (props) => {
    
    return (
        <div className={classes.Board}> 
            This Board is called: "{props.board.name}"
        {
            props.board.lists.map((list, index) => {
                return <List list={list}></List>
            })
        }
        </div>
        );        
}

const mapStateToProps = state => {
    return {
        board: state.boards[0],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateboard: (board) => dispatch({type: actionTypes.UPDATE_BOARD, board: board}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (board);