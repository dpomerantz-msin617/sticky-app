import React, {useState} from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';

import classes from './List.module.css';
import Note from '../Note/Note';
import * as actionFunc from '../../store/actions/action-func';

const List = (props) => {
    console.log('List Props', props);
    const [editing, setEdit] = useState( false);
    const [titleText, setTitle] = useState('');
    
    const updateListTitle = event => {
        setTitle(event.target.value);
    };
    const editList = () => {
        setEdit(true);
    }
    const saveListTitle = (id, list, titleText) => {
        props.onUpdateTitle(id, list, titleText);
        setEdit(false);
    }
    const title = <TextField key={'list-'+ props.list.id} 
                             fullWidth disabled={!editing}
                             label="List Title" defaultValue={props.list.name}
                             onChange={updateListTitle}/>;
    const editToggleBtn = (editing) ? 
                    <CheckIcon className={classes.InputIcon} 
                                onClick={() => saveListTitle(props.list.id, 
                                                                        props.list, 
                                                                        titleText)} /> : 
                    <EditIcon className={classes.InputIcon} 
                              onClick={editList} 
                              fontSize="small"/>;



    const addNoteIcon = <AddIcon onClick={() => props.onAddList(props.list)}/>;
    const notes = (props.list.notes) ? <div> {props.list.notes.map((note, i) => {
                                                return <Note note={note} key={note.id}></Note>;
                                            })}
                                            {addNoteIcon}
                                        </div> :
                                        <strong> {addNoteIcon} Add A Note </strong>;

    return (<div className={classes.List}> 
                <div>{title}{editToggleBtn}</div>
                { notes }
            </div>);
}
  
const mapDispatchToProps = dispatch => {
    return {
        onAddList: (list) => dispatch(actionFunc.addNote(list.id, list)),
        onUpdateTitle: (id, list, title) => dispatch(
            actionFunc.loadUpdateTitle(id, 'lists', list, title))
    }
}

export default connect(null, mapDispatchToProps) (List);