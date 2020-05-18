import React from 'react';
import List from '../List/List';
import classes from './Board.module.css';

const board = (props) => (
<div className={classes.Board}> This Board is called: "{props.board.name}"
{
    props.board.lists.map((list, index) => {
        return <List list={list}></List>
    })
}
</div>
);

export default board;