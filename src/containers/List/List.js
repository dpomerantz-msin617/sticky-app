import React from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

import classes from './List.module.css';
import Note from '../Note/Note';
import * as actionFunc from '../../store/actions/action-func';

const List = (props) => console.log(props) || (
<div className={classes.List}> This List is called: "{props.list.name}"
    {
        props.list.notes.map((note, i) => {
            return <Note note={note} key={i}></Note>
        })
    }
    <AddIcon onClick={() => props.onAddList(props.list)}/>
</div>
);

const mapDispatchToProps = dispatch => {
    return {
        onAddList: (list) => dispatch(actionFunc.addNote(list.id, list))
    }
}

export default connect(null, mapDispatchToProps) (List);