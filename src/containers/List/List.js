import React from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

import classes from './List.module.css';
import Note from '../Note/Note';
import * as actionFunc from '../../store/actions/action-func';

const List = (props) => {
    const addNoteIcon = <AddIcon onClick={() => props.onAddList(props.list)}/>;
    const notes = (props.list.notes) ? <div> {props.list.notes.map((note, i) => 
                                          <Note note={note} key={i}></Note>)}
                                            {addNoteIcon}
                                        </div> :
                                        <strong> {addNoteIcon} Add A Note </strong>;

    return (<div className={classes.List}> This List is called: "{props.list.name}"
                { notes }
            </div>);
}
  
const mapDispatchToProps = dispatch => {
    return {
        onAddList: (list) => {
            console.log('List', list);
            return dispatch(actionFunc.addNote(list.id, list));
        }
    }
}

export default connect(null, mapDispatchToProps) (List);