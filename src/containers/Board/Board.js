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
            boardId: 0,
            title: ''
        };
    }

    componentDidMount () {
        this.props.onInitBoards();
      }

    updateTitle = event => {
        this.setState({title: event.target.value});
    }
    render() {
        if(this.props.loaded){
            const title = <TextField fullWidth disabled={!this.props.board.editing}
                                                        label="Board Title" defaultValue={this.props.board.name}
                                                        onChange={this.updateTitle}/>;
            const editToggleBtn = (this.props.board.editing) ? 
                                    <CheckIcon className={classes.Icon} onClick={() => this.props.onUpdateTitle(this.state.boardId, this.props.board, this.state.title)} /> : 
                                    <EditIcon className={classes.Icon} onClick={() => this.props.onEditBoard(this.state.boardId)} fontSize="small"/>;
            return (
            <div className={classes.Board}> 
                <div className={classes.Header}>
                        <div className={classes.Title}>{title}{editToggleBtn}</div>
                </div>
            {
                Object.keys(this.props.lists).map((key) => {
                return <List list={this.props.lists[key]} key={key}></List>
                })
            }
            <AddIcon onClick={() => this.props.onAddList(this.state.boardId, this.props.board)}/>
            </div>
            );        
        } else {
            return <h2>LOADING...</h2>
        }
    }
}

const mapStateToProps = state => {
    console.log('State', state);
    const boardIds = Object.keys(state.boards);
    console.log('BoardIDs', boardIds);
    if(boardIds.length > 0){
        const activeBoard = getActiveBoard(boardIds, state.boards);
        console.log('ActiveBoard', activeBoard);
        const board = {...activeBoard};
        console.log('Active Lists: ', {...activeBoard.lists});
        const lists = [...activeBoard.lists].map(i => {
            return {...state.lists[i]};
          });
        return {
            board: board,
            lists: lists,
            loaded: state.loaded
        }
    } else {
        return state;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitBoards: () => dispatch(actionFunctions.initBoards()),
        onUpdateTitle: (id, board, title) => dispatch(actionFunctions.loadUpdateBoardTitle(id, board, title)),
        onEditBoard: (id) => dispatch({type: actionTypes.EDIT_BOARD, id: id}),
        onAddList: (id, board) => dispatch(actionFunctions.addList(id, board))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Board);