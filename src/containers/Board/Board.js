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
        console.log(event.target.value);
        this.setState({title: event.target.value});
    }
    render() {
        if(this.props.loaded){
            const title = <TextField id="standard-basic" fullWidth disabled={!this.props.board.editing}
            label="Board Title" defaultValue={this.props.board.name}
            onChange={this.updateTitle}/>;
            const editToggleBtn = (this.props.board.editing) ? 
            <CheckIcon onClick={() => this.props.onUpdateTitle(this.state.boardId, this.props.board, this.state.title)} /> : 
            <EditIcon onClick={() => this.props.onEditBoard(this.state.boardId)} fontSize="small"/>;
            return (
            <div className={classes.Board}> 
            {title}
            {editToggleBtn}
            {
                Object.keys(this.props.lists).map((key) => {
                if(this.props.lists[key]) return <List list={this.props.lists[key]} key={key}></List>
                })
            }
            <AddIcon onClick={() => this.props.onAddList(this.state.boardId)}/>
            </div>
            );        
        } else {
            return <h2>LOADING...</h2>
        }
    }
}

const mapStateToProps = state => {
    console.log('State', state);
    if(state.boards[0]){
        const board = {...state.boards[0]};
        const lists = Object.assign({}, [...board.lists].map((i, index) => {
            return {...state.lists[index]};
          })
        );
        console.log(board);
        console.log(lists)
        return {
            board: board,
            lists: lists,
            loaded: state.loaded
        }
    } else {
        return null;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitBoards: () => dispatch(actionFunctions.initBoards()),
        onUpdateTitle: (id, board, title) => dispatch(actionFunctions.loadUpdateBoardTitle(id, board, title)),
        onEditBoard: (id) => dispatch({type: actionTypes.EDIT_BOARD, id: id}),
        onAddList: (id) => dispatch({type: actionTypes.ADD_LIST, id: id})
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Board);