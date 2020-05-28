import React, {Component} from 'react';
import * as actionTypes from '../../store/actions/actions';
import * as actionFunctions from '../../store/actions/action-func';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

import List from '../List/List';
import classes from './Board.module.css';
import {getActiveBoard} from '../../helpers/objectHelper';

class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: ''
        };
    }

    updateTitle = event => {
        this.setState({title: event.target.value});
    }

    render() {
        if(this.props.loaded){
            console.log('Board: ', this.props);
            const title = <TextField key={'board-'+this.props.board.id} label="Board Title"
                                     fullWidth disabled={!this.props.board.editing}
                                     defaultValue={this.props.board.name}
                                     onChange={this.updateTitle}/>;
            
            const editToggleBtn = (this.props.board.editing) ? 
                                    <CheckIcon className={classes.InputIcon} onClick={() => this.props.onUpdateTitle(this.props.board.id, this.props.board, this.state.title)} /> : 
                                    <EditIcon  className={classes.InputIcon} onClick={() => this.props.onEditBoard(this.props.board.id)} fontSize="small"/>;
            
            const lists = (this.props.lists.length > 0) ?  
                                    [...this.props.lists].map((listId, index) => {
                                                const myList = this.props.lists[index];
                                                const myNotes = (myList.notes) ? 
                                                        myList.notes.map((noteId) => {
                                                            const mappedNote = this.props.notes.find(n => n.id === noteId);
                                                            return {...mappedNote};
                                                        }) : [];
                                                const listWithNotes = {...myList,
                                                                        notes: [...myNotes]
                                                                    };
                                                        return <List list={listWithNotes} key={myList.id}></List>
                                    }) :
                                    <strong className={classes.AddListText}>You Can Add A List Here</strong>;
            return (
                <div className={classes.Board}> 
                    <div className={classes.Header}>
                            <div className={classes.Title}>{title}{editToggleBtn}</div>
                    </div>
                { lists }
                <AddIcon className={classes.AddIcon} 
                        onClick={() => this.props.onAddList(this.props.board.id, this.props.board)}/>
                </div>
            );        
        } else {
            return <h2>LOADING...</h2>
        }
    }
}

const mapStateToProps = state => {
    const boardIds = Object.keys(state.boards);
    if(boardIds.length > 0){
        console.log('State', state);
        const activeBoard = getActiveBoard(boardIds, state.boards);
        const board = {...activeBoard};
        const lists = (activeBoard.lists) ? 
                        [...activeBoard.lists].map(i => {return {...state.lists[i]}; }) : 
                        [];
        const notes = lists.map(list => list.notes)
                           .map(noteId => state.notes[noteId]);

        console.log('Activeboards:', activeBoard); //@todo remove, but still need for debugging
        console.log('ActiveLists:', lists); //@todo remove, but still need for debugging
        console.log('ActiveNotes:', notes); //@todo remove, but still need for debugging

        return {
            board: board,
            lists: lists,
            notes: notes,
            loaded: state.loaded
        }
    } else {
        return state;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateTitle: (id, board, title) => dispatch(actionFunctions.loadUpdateTitle(id, 'boards', board, title)),
        onEditBoard: (id) => dispatch({type: actionTypes.EDIT_BOARD, id: id}),
        onAddList: (id, board) => dispatch(actionFunctions.addList(id, board))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Board);