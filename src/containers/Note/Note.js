import React, { Component } from 'react';
import classes from './Note.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/aux-div';
import * as actionTypes from '../../store/actions/actions';
import {connect} from 'react-redux';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Note extends Component {
    state = {
        note: {...this.props.note},
        showNoteModal: false
    };
    editNoteClickHandler = (props) => {
        console.log(props);
        this.setState({showNoteModal: true});
    }
    updateNote = (event) => {
        event.preventDefault();
        console.log(event);
    }
    notEditing = () => {
        this.setState({showNoteModal:false});
    }

    handleSubmit(e) {
        e.preventDefault();
        const { title, description } = this.state;
        const body = { title, description };
        const json = JSON.stringify(body);
        console.log(json);
    }

    render() {
        // this.handleChange = this.handleChange.bind(this);
      const noteModal = <form className={classes.Note} noValidate autoComplete="off" onSubmit={this.props.onUpdateNote}>
                        <TextField  id="standard-basic" fullWidth 
                            label="Note Title" defaultValue={this.state.note.title}/>
                        <TextField  id="standard-basic" fullWidth           
                            label="Note Description:" defaultValue={this.state.note.description}/>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </form>;
    return (
        <Aux>
            <div className={classes.Note}>
                <h3>{this.state.note.title}</h3>
                <EditIcon onClick={this.editNoteClickHandler} fontSize="small"/>
            </div>
            <Modal show={this.state.showNoteModal} modalClosed={this.notEditing}>
                    {noteModal}
            </Modal>
        </Aux>
    );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddNote: (note) => dispatch({type: actionTypes.ADD_NOTE, note: note}),
        onUpdateNote: (note) => dispatch({type: actionTypes.UPDATE_NOTE, note: note}),
        onRemoveNote: (noteId) => dispatch({type: actionTypes.REMOVE_NOTE, noteId: noteId})
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Note);