import React from 'react';
import classes from './Toolbar.module.css';
import DrawerToggle from '../SideBar/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <nav className={classes.DesktopOnly}>
            <h2>Sticky Note Organizer</h2>
        </nav>
    </header>
);
export default toolbar;