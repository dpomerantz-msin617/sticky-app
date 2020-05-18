import React from 'react';
import classes from './Note.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/aux-div';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';

const note = (props) => {
    let showNoteModal = false;
    const editNoteClickHandler = () => {
        console.log(props);
        showNoteModal = true;
    }
    let noteModal = <form className={classes.Note} noValidate autoComplete="off">
                        <TextField  id="standard-basic" 
                            label="Note Title" defaultValue={props.note.title}/>
                        <p>Note Description: "{props.note.description}"</p>
                    </form>;

    return (
        <Aux>
            <div className={classes.Note}>
                <h3>{props.note.title}</h3>
                <EditIcon onClick={editNoteClickHandler} fontSize="small"/>
            </div>
            <Modal show={showNoteModal}>
                    {noteModal}
            </Modal>
        </Aux>
    );
}

export default note;