import React from 'react';
import * as actionFunctions from '../../store/actions/action-func';
import { connect } from 'react-redux';
import classes from './Sidebar.module.css';

const Sidebar = (props) =>{
    console.log('SIDEBAR', props)
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
        </div>
    )
};

const mapStateToProps = state => {
    return {
        boards: state.boards
    }
};

const mapDispatchToProps = dispatch => {
    return {
        activateBoard: (boards, id) => dispatch(actionFunctions.activateBoard(boards, id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);