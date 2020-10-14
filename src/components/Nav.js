import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import * as actionsCart from '../store/actions/cartAction';
import * as actionsBrowse from '../store/actions/browse';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Cart from '../components/Items/Cart'
import axios from 'axios';



const Nav = (props) => {
    const classes = useStyles();
    const history = useHistory();
    
    const data=Array.from(props.items);

    const handleOnInputChange = (event) => {
        const query = event.target.value;
        props.onSearchItem(query)   
    };
    const generateRandomData=async ()=>{
       return await axios.get("http://127.0.0.1:8000/random/")
       
    }
    return (
        <div>
            <AppBar>
                <Toolbar>
                 
                    <Button variant="outlined" color="inherit" onClick={() => { history.push('/') }} className={classes.title}>Home</Button>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            onChange={(e)=>{handleOnInputChange(e)}}
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
                                <div className={classes.cartButton}>
                                <p >{props.username}</p>
                                {props.username==="admin"?<Button  onClick={()=>{generateRandomData();window.location.reload(false);}} color="inherit">Generate Random Data</Button>:<></>}
                                
                                <Button  onClick={() => { history.push('/change_password'); }} color="inherit">Change Password</Button>
                                <Button  onClick={() => { history.push('/myitems') }} color="inherit">My Items</Button>                             
                                <Button  onClick={() => { props.onSignOut();history.push('/') ;props.onClearBasket();}} color="inherit">Logout</Button>
                                <Cart></Cart>
                              
                                </div>
                                :
                                <>

                                    <Button  onClick={() => { history.push('/login') }} color="inherit">Login</Button>
                                    <Button   onClick={() => { history.push('/signup') }} color="inherit">Sign Up</Button>
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
        token: state.authReducer.token,
        username:state.authReducer.username,
        items:state.browseReducer.items,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignOut: () => dispatch(actions.logout()),
        onClearBasket:()=>dispatch(actionsCart.clearBasket()),
        onSearchItem:(item)=>dispatch(actionsBrowse.searchItems(item)),
      
    }
}

const useStyles = makeStyles((theme) => ({
    title: {
        justifyContent: 'flex-start',
        width: 'fit-content'
    },
    buttons: {
        marginLeft: 'auto',
        marginRight: 0,
    },
    cartButton:{
        display:'flex',
        flexDirection:'row'
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