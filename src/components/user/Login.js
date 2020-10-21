import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import * as actions from '../../store/actions/auth';

const Login = (props) => {


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(true)
    const [disableButton, setDisableButton] = useState(true)
 

    let message = null;

    const handleSubmit = async(e) => {
        e.preventDefault();
        props.onAuth(userName, password,props.history);
  
        setOpen(true)
        setUserName("")
        setPassword("")
    }
    useEffect(() => {
        document.title = "Login"
        if (userName && password) {
            setDisableButton(false)
        }
        else {
            setDisableButton(true)
        }

    });
    if (props.error) {

            message = (
                <Snackbar open={open} autoHideDuration={1000} onClose={() => setOpen(!open)} >
                    <Alert severity="error">
                        Please check your username and password
                </Alert>
                </Snackbar>
            );
        }

  
    const classes = useStyles();

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                {message}
                <TextField label="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <TextField label="Password" type="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <Button type="submit" disabled={disableButton}>Login</Button>

            </form>

        </div>


    );
};
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: window.innerHeight / 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column'
    }
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const mapStateToProps = (state) => {
    return {
        error: state.authReducer.error,
    
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password,history) => dispatch(actions.authLogin(username, password,history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
