import React, {Component} from 'react';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

import List from '../List/List';
import classes from './Board.module.css';

class Board extends Component {
    editing = false;
    
    render() {
        const title = <TextField id="standard-basic" fullWidth disabled={!this.props.board.editing}
                                            label="Board Title" defaultValue={this.props.board.name}/>;
        return (
            <div className={classes.Board}> 
                {title}
                <EditIcon onClick={() => this.props.onEditBoard(true, 1)} fontSize="small"/>
            {
                this.props.board.lists.map((list, index) => {
                    return <List list={list}></List>
                })
            }
            </div>
            );        
    }
}

const mapStateToProps = state => {
    return {
        board: state.boards[0],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateboard: (board) => dispatch({type: actionTypes.UPDATE_BOARD, board: board}),
        onEditBoard: (edit, id) => dispatch({type: actionTypes.EDIT_BOARD, edit: edit, boardId: id})
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Board);