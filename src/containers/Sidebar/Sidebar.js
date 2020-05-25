import React from 'react';
import * as actionTypes from '../../store/actions/actions';
import { connect } from 'react-redux';
import classes from './Sidebar.module.css';

const Sidebar = (props) =>{
    console.log('SIDEBAR', props)
    return (
        
        <div className={classes.Sidebar}>
        {
            Object.keys(props.boards).map(i => {
                return <h3 className={(props.boards[i].active) ? classes.Active : ''}>{props.boards[i].name}</h3>
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
        activateBoard: (id) => dispatch({type: actionTypes.ACTIVATE_BOARD, id: id})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);