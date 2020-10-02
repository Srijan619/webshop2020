import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';

const Nav = (props) => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div >
            <AppBar>
                <Toolbar>
                    <Button color="inherit" onClick={() => { history.push('/') }} className={classes.title}>Home</Button>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.buttons}>
                        {
                            props.token ?
                            <>
                                <Button onClick={() => { props.onSignOut();history.push('/logout') }} color="inherit">Logout</Button>
                                <IconButton>  <ShoppingCartIcon style={{fill: "white"}}/></IconButton>
                              
                                </>
                                :
                                <>

                                    <Button onClick={() => { history.push('/login') }} color="inherit">Login</Button>
                                    <Button onClick={() => { history.push('/signup') }} color="inherit">Sign Up</Button>
                                </> 
                        }


                    </div>
                </Toolbar>
            </AppBar>
        </div >
    );
};
const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignOut: () => dispatch(actions.logout())
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        justifyContent: 'flex-start',
        width: 'fit-content'
    },
    buttons: {
        marginLeft: 'auto',
        marginRight: 0
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
}));
export default connect(mapStateToProps, mapDispatchToProps)(Nav);