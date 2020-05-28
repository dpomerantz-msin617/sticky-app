import React from 'react';
import classes from './SideBar.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/aux-div';

const sideBar = (props) => {
    const attachedClasses = (props.open) ? 
                                [classes.SideBar, classes.Open] : 
                                [classes.SideBar, classes.Close];
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <nav>
                    {props.children}
                </nav>
            </div>
            <div className={classes.SideBar + ' ' + classes.DesktopOnly}>
                {props.children}
            </div>

        </Aux>
    );
}

export default sideBar;