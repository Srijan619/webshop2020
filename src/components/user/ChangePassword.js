import React, {  useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actionChangePassword from '../../store/actions/changePasswordAction';

const ChangePassword = (props) => {


    const [oldPassword, setoldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        props.onChangePassword(oldPassword,newPassword1,newPassword2);
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
                        <TextField label="Old Password" type="Password" value={oldPassword} onChange={(e) => setoldPassword(e.target.value)} />
                        <TextField label="New Password" type="Password" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} />
                        <TextField label="New Password Again" type="Password" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
                        <Button type="submit">Change Password</Button>
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
        error: state.changePasswordReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangePassword: (oldPass, newPass1,newPass2) => dispatch(actionChangePassword.authChangePassword(oldPass,newPass1,newPass2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
