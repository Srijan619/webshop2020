import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

const SignUp= (props) => {


    const [userName, setUserName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        props.onSignUp(userName, email, password1,password2);
        await new Promise(resolve => setTimeout(resolve, 1000)); //Because error is null at the beginning, just a little trick to wait for it to update
        if (!props.error) {
            props.history.push('/');
        }


    }

    const classes = useStyles();
    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }
    return (
        <div>
            {errorMessage}
            {
                props.loading ? <p>loading </p> :
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField label="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField label="Password" type="Password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                        <TextField label="Password Confirm" type="Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                        <Button type="submit">SignUp</Button>
                    </form>

            }
        </div>


    );
};
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:'5%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column'
    }
}));

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (username,email, password1,password2) => dispatch(actions.authSignup(username,email,password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
