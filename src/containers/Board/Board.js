import React, {Component} from 'react';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';

import List from '../List/List';
import classes from './Board.module.css';

class Board extends Component {
    editing = false;
    
    render() {
        const title = <TextField id="standard-basic" fullWidth disabled={!this.props.board.editing}
                                            label="Board Title" defaultValue={this.props.board.name}/>;
        const editToggleBtn = (this.props.board.editing) ? 
                <CheckIcon /> : <EditIcon onClick={() => this.props.onEditBoard(true, 1)} fontSize="small"/>;
        return (
            <div className={classes.Board}> 
                {title}
                {editToggleBtn}
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
        board: state.boards.byIds[1]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateTitle: (board) => dispatch({type: actionTypes.UPDATE_BOARD, board: board}),
        onEditBoard: (edit, id) => dispatch({type: actionTypes.EDIT_BOARD, edit: edit, id: id}),
        onAddList: (id) => dispatch({type: actionTypes.ADD_LIST, id: id})
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Board);