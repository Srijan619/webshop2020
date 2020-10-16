import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux';
import * as actionAdd from '../../store/actions/browse'
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import  MuiAlert  from '@material-ui/lab/Alert';



const useStyles = makeStyles({
    card: {
        maxHeight: 300,
        maxWidth: 300,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',

    }

});
const AddItems = (props) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [openError,setOpenError]=useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault();
     
         props.onAddItems(title,description,price,props.posted_by);
      
       if(!props.error){
        history.push('/myitems')
       }
        setTitle("")
        setDescription("")
        setPrice("")
        setOpenError(true)
        setOpen(false)

        
    } 


    let message = null;
    if (props.error) {
        message = (
            <Snackbar open={openError} autoHideDuration={1000}  onClose={() => setOpenError(!openError)} >
            <Alert  severity="error">
              {props.error.message}
            </Alert>
          </Snackbar>
        );
    }
  
    return (
        <div >
           
            <div  >
                <Button onClick={() => { setOpen(!open); }} color="primary" variant="outlined"
                  style={{marginTop:'4%',marginBottom:'1%'}}>Add Item </Button>
            </div>
            {open ?
                <Card className={classes.card}>
               
                  <form className={classes.content} noValidate autoComplete="off" onSubmit={handleSubmit} >
              
                        <TextField label="Title" variant="filled" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <TextField label="Description" multiline variant="filled"  value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <TextField label="Price" type="number"  variant="filled" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <Button  color="primary" variant="contained" type="submit">Add</Button>
                      
                    </form>
                    {message}
                   
                  </Card> :
                <></>
            }


        </div >
    );
};
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const mapStateToProps = (state) => {
    return {
        error: state.browseReducer.error,
        posted_by:state.authReducer.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddItems: (title,description,price,posted_by) => dispatch(actionAdd.addItems(title,description,price,posted_by)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddItems);