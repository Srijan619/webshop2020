import React, {  useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import  MuiAlert  from '@material-ui/lab/Alert';
import * as actionChangePassword from '../../store/actions/changePasswordAction';

const ChangePassword = (props) => {


    const [oldPassword, setoldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [disableButton,setDisableButton]=useState(true)
    const [open,setOpen]=useState(true)


    useEffect(() => {
        document.title="Change Password"
        if(oldPassword&&newPassword1&&newPassword2){
            setDisableButton(false)
          
        }
        else{
            setDisableButton(true)
        }
         // eslint-disable-next-line
      });
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(newPassword1!==newPassword2){
            props.onDispatchError({"message":"Password doesn't match"})

        }
        else{
         props.onChangePassword(oldPassword,newPassword1,newPassword2,props.history);
       
    }
        setoldPassword("")
        setNewPassword1("")
        setNewPassword2("")
        setOpen(true)

    }
 
    const classes = useStyles();
    let message = null;
    if(props.error){
        message = (
            <Snackbar open={open} autoHideDuration={1000}  onClose={() => setOpen(!open)} >
            <Alert  severity="error">
              {props.error.message}
            </Alert>
          </Snackbar>
        );
    }
    if(props.status===200)
    {
        message=(<Snackbar  open={open} autoHideDuration={1000}  onClose={() => setOpen(!open)} >
            <Alert severity="success">
              Successfully Saved!
            </Alert>
          </Snackbar>)
    }
    return (
        <div>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    {message}
                        <TextField label="Old Password" type="Password" value={oldPassword} onChange={(e) => setoldPassword(e.target.value)} />
                        <TextField label="New Password" type="Password" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} />
                        <TextField label="New Password Again" type="Password" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
                        <Button type="submit"  disabled={disableButton}>Change Password</Button>
                    </form>

        </div>


    );
};
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: window.innerHeight/10,
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
        error: state.changePasswordReducer.error,
        status:state.changePasswordReducer.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangePassword: (oldPass, newPass1,newPass2,history) => dispatch(actionChangePassword.authChangePassword(oldPass,newPass1,newPass2,history)),
        onDispatchError:(err)=>dispatch(actionChangePassword.changePasswordFail(err))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
