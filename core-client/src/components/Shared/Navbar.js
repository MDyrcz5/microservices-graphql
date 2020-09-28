import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import history from '../../helpers/history';
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useDispatch, useSelector } from "react-redux";
import { clearSession } from "#root/store/ducks/session";
import { useHistory } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const mutation = gql`
  mutation($sessionId: ID!) {
    deleteUserSession(sessionId: $sessionId)
  }
`;

const Navbar = () => {
    const session = useSelector(state => state.session);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteUserSession] = useMutation(mutation);
    const dispatch = useDispatch();

    const classes = useStyles();

    let history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Microservices Archtecture Movie Application
                </Typography>
                    <>
                        {session ? <>   <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={handleClick}>
                            <MenuIcon />
                        </IconButton> <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                                <MenuItem> Logged in as {session.user.email} </MenuItem>
                                <MenuItem onClick={evt => {
                                    evt.preventDefault();
                                    dispatch(clearSession());
                                    deleteUserSession({ variables: { sessionId: session.id } });
                                }}>Log out</MenuItem>
                            </Menu>
                        </> : <Button onClick={() => history.push('/login')} color="inherit"> Login </Button>}
                    </>
                </Toolbar>
            </AppBar>
        </div>
    );
};

// <IconButton onClick={handleClick}edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//     <MenuIcon />
// </IconButton>


export default Navbar;