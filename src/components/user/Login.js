import React, {  useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

const Login = (props) => {


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        props.onAuth(userName, password);
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
        
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                         {errorMessage}
                        <TextField label="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <TextField label="Password" type="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit">Login</Button>
                    </form>

        </div>


    );
};
const useStyles = makeStyles((theme) => ({
    root: {
       marginTop: '5%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column'
    }
}));

const mapStateToProps = (state) => {
    return {
        error: state.authReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
