import React from 'react';
import Note from '../Note/Note';
import classes from './List.module.css';

const list = (props) => console.log(props) || (
<div className={classes.List}> This List is called: "{props.list.name}"
    {
        props.list.notes.map((note, i) => {
            return <Note note={note}></Note>
        })
    }
</div>
);

export default list;