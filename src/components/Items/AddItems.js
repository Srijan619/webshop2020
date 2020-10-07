import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import * as actionAdd from '../../store/actions/browse'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles({

    button: {
        position: 'relative'
    },
    card: {
        position: 'absolute',
        marginTop: '1%',
        maxHeight: 300,
        minWidth: 300,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
     
         props.onAddItems(title,description,price,props.posted_by);
      
        //At first the error is null, so have to set time out
        // await new  Promise(resolve => setTimeout(resolve, 2000));
     
        history.push('/myitems')

        
    } 

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }
    return (
        <div>
           
            <div className={classes.button} >
                <Button onClick={() => { setOpen(!open); }} color="primary" variant="outlined"
                  style={{marginTop:'4%'}}>Add Item </Button>
            </div>
            {open ?
                <Card className={classes.card}>
                  <form className={classes.content} noValidate autoComplete="off" onSubmit={handleSubmit} >
                  {errorMessage}
                        <TextField label="Title"  value={title} onChange={(e) => setTitle(e.target.value)} />
                        <TextField label="Description" multiline  value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <TextField label="Price" type="number"  value={price} onChange={(e) => setPrice(e.target.value)} />
                        <Button >Upload Image</Button>
                        <Button  color="primary" variant="contained" type="submit">Add</Button>
                      
                    </form>
                  </Card> :
                <></>
            }


        </div >
    );
};
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