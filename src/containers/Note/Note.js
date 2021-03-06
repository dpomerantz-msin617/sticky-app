import React, { Component } from 'react';
import classes from './Note.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/aux-div';
import {connect} from 'react-redux';

import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as actionTypes from '../../store/actions/actions';
import * as actionFunc from '../../store/actions/action-func';

class Note extends Component {
    state = {
        name : '',
        description: '',
        showNoteModal: false
    };

    componentDidMount () {
        console.log('Note Props', this.props);
        const thisNote = (this.props.note) ? this.props.note : this.state;
        this.setState({...thisNote});
      }
    
    editNoteClickHandler = (props) => {
        this.setState({showNoteModal: true});
    }
    notEditing = () => {
        this.setState({showNoteModal:false});
    }
    handleChange(e, fieldName){
        this.setState({[fieldName]: e.target.value});
    }
    handleSubmit(e, note) {
        e.preventDefault();
        this.props.updateNote({...note,
            name: this.state.name,
            description: this.state.description});
        }

    render() {
      const noteModal = <form className={classes.Note} noValidate autoComplete="off" onSubmit={(event) =>this.handleSubmit(event, this.props.note)}>
                        <TextField  id={'note-title'} fullWidth 
                            label="Note Title" defaultValue={this.props.note?.name}
                            onChange={(event) => this.handleChange(event, 'name')}/>
                        <TextField  id="note-description" fullWidth           
                            label="Note Description:" defaultValue={this.props.note?.description}
                            onChange={(event) => this.handleChange(event, 'description')}/>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </form>;
    return (
        <Aux>
            <div className={classes.Note}>
                <h3>{this.state.name}</h3>
                <small>{this.state.description}</small>
                <EditIcon className={classes.EditIcon}
                          onClick={this.editNoteClickHandler} fontSize="small"/>
            </div>
            <Modal show={this.state.showNoteModal} modalClosed={this.notEditing}>
                    {noteModal}
            </Modal>
        </Aux>
    );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateNote: (note) => dispatch(actionFunc.updateNote(note)),
        onRemoveNote: (noteId) => dispatch({type: actionTypes.REMOVE_NOTE, noteId: noteId})
    }
}

export default connect (null, mapDispatchToProps)(Note);