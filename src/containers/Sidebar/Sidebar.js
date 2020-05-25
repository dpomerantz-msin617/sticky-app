import React from 'react';
import * as actionTypes from '../../store/actions/actions';
import { connect } from 'react-redux';

const Sidebar = (props) =>{
    console.log('SIDEBAR', props)
    return (
        <div></div>
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