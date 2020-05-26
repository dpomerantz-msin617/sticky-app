import React from 'react';
import * as actionFunctions from '../../store/actions/action-func';
import { connect } from 'react-redux';
import classes from './Sidebar.module.css';
import AddIcon from '@material-ui/icons/Add';

const Sidebar = (props) =>{
    const clickedBoardHandler = (clickedBoard, id) => {
        if (!clickedBoard.active){
            props.activateBoard(props.boards, id);
        } 
    }
    
    return (       
        <div className={classes.Sidebar}>
        {
            Object.keys(props.boards).map(i => {
                return <h3 className={(props.boards[i].active) ? classes.Active : ''}
                           onClick={() => clickedBoardHandler(props.boards[i], i)}
                           key={i}
                        >
                            {props.boards[i].name}
                        </h3>
            })
        }
        <AddIcon onClick={() => props.addBoard(props.boards)}/>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        boards: {...state.boards}
    }
};

const mapDispatchToProps = dispatch => {
    return {
        activateBoard: (boards, id) => dispatch(actionFunctions.activateBoard(boards, id)),
        addBoard: (boards) => dispatch(actionFunctions.addBoard(boards))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);