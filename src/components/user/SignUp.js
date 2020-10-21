import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import * as actions from '../../store/actions/auth';

const SignUp = (props) => {


    const [userName, setUserName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(true)
    const [disableButton, setDisableButton] = useState(true)


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password1 !== password2) {
            props.onDispatchError({ "message": "Password doesn't match" })
        }
        else {
            props.onSignUp(userName, email, password1, password2, props.history);
          

        }

        setOpen(true)
        setUserName("")
        setPassword1("")
        setPassword2("")
        setEmail("")

    }
    useEffect(() => {
        document.title = "Sign Up"
        if (userName && password1 && password2 && email) {
            setDisableButton(false)

        }
        else {
            setDisableButton(true)
        }

        // eslint-disable-next-line
    });
    const classes = useStyles();
    let message = null;
    if (props.error) {

        message = (
            <Snackbar open={open} autoHideDuration={1000} onClose={() => setOpen(!open)} >
                <Alert severity="error">
                {props.error.message}
                </Alert>
            </Snackbar>
        );

    }


    return (
        <div>

            {
                props.loading ? <p>loading </p> :
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                        {message}
                        <TextField label="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField label="Password" type="Password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                        <TextField label="Password Confirm" type="Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                        <Button type="submit" disabled={disableButton}>SignUp</Button>
                    </form>

            }
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
        loading: state.authReducer.loading,
        error: state.authReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (username, email, password1, password2, history) => dispatch(actions.authSignup(username, email, password1, password2, history)),
        onDispatchError: (err) => dispatch(actions.authFail(err))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
