import React, {Component} from 'react';
import * as actionTypes from '../../store/actions/actions';
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
        this.state = {title: ''};
    }
    updateTitle = event => {
        console.log(event.target.value);
        this.setState({title: event.target.value});
    }
    render() {
        const title = <TextField id="standard-basic" fullWidth disabled={!this.props.board.editing}
                                            label="Board Title" defaultValue={this.props.board.name}
                                            onChange={this.updateTitle}/>;
        const editToggleBtn = (this.props.board.editing) ? 
                <CheckIcon onClick={() => this.props.onUpdateTitle(1, this.state.title)} /> : 
                <EditIcon onClick={() => this.props.onEditBoard(1)} fontSize="small"/>;
        return (
            <div className={classes.Board}> 
                {title}
                {editToggleBtn}
            {
                this.props.board.lists.map((list, index) => {
                    return <List list={list}></List>
                })
            }
            <AddIcon onClick={() => this.props.onAddList(1)}/>
            </div>
            );        
    }
}

const mapStateToProps = state => {
    console.log('State', state);
    return {
        board: state.boards[1]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateTitle: (id, title) => dispatch({type: actionTypes.UPDATE_BOARD_TITLE, id: id, title: title}),
        onEditBoard: (id) => dispatch({type: actionTypes.EDIT_BOARD, id: id}),
        onAddList: (id) => dispatch({type: actionTypes.ADD_LIST, id: id})
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Board);