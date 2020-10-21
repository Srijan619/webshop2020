import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import * as actionCart from '../../store/actions/cartAction'
import * as actionCheckOut from '../../store/actions/checkoutAction'
import * as actionBrowse from '../../store/actions/browse'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import  MuiAlert  from '@material-ui/lab/Alert';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';



const useStyles = makeStyles({

    button: {
        position: 'relative'
    },
    card: {
        position: 'absolute',
        top: 0,
        marginTop: '4%',
        right: '1%',
        maxHeight: 300,
        minWidth: 300,
        overflowY: 'scroll'
    },
    content: {
        display: 'flex',
        flexDirection: 'row',

    },
    total: {
        position: 'sticky',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        color:'Blue'
    }

});
const Cart = (props) => {
    const data=(Array.from(props.items));
    const [open, setOpen] = useState(false);
    const [openMessage,setOpenMessage]=useState(true)

    const classes = useStyles();

    
    const sub_total= data.reduce((a,b)=> a=a+parseFloat(b.price),0); //Calculating total

    const removeItem=(item,e)=>{
        props.onRemoveItem(item)
    }

    const checkoutItem=  async(e)=>{
        e.preventDefault();
        await props.onCheckOutItem(data,props.sold_to);
        setOpenMessage(true)
        props.onGetItems(1)
        props.onClearBasket()
    }
    let message = null;
    if (props.error) {
        message = (
            <Snackbar open={openMessage} autoHideDuration={1000}  onClose={() => {setOpenMessage(!openMessage);setOpen(true)}} >
            <Alert  severity="error">
              {props.error.message}
            </Alert>
          </Snackbar>
        );
    }
    if(props.status===201)
    {
        //Need to refresh the page because, brwose state consist all items, it is only conditionally rendered so
        message=(<Snackbar  open={openMessage} autoHideDuration={1000}  onClose={() => {setOpenMessage(!openMessage);setOpen(false);window.location.reload(false);}}>
            <Alert severity="success">
              Successfull Transaction!
            </Alert>
          </Snackbar>)
    }
    return (
        <div>
                 
            <div className={classes.button} >
                <IconButton onClick={() => setOpen(!open)}>
                    <ShoppingCartIcon style={{ fill: "white" }} />
                    <Typography  style={{ color: "white" }} >{data.length}</Typography>
                   
                </IconButton>
            </div>
            {open ?
                <Card className={classes.card}>
                    {message}
                    <form  onSubmit={ checkoutItem}>
                    <Card >
               
                        {data.map(item => {
                            return (
                                <List  key={item.id}>
                                    <ListItem >
                                        <IconButton  onClick={(e) => removeItem(item, e)}><RemoveCircleIcon></RemoveCircleIcon></IconButton>
                                        
                                        <ListItemText primary={item.title} style={{textAlign:'left'}}></ListItemText>
                                        <ListItemText primary={item.price} style={{textAlign:'right'}}></ListItemText>
                                   
                                    </ListItem>
                                    <Divider></Divider>
                                </List>

                            )
                        })}

                    </Card>
                    <Card className={classes.total}>
                        {data.length?  <Button  type="submit" variant="contained"  style={{float:"right"}}>CheckOut</Button>
               :<></>}
                       <ListItemText primary={"Total"} style={{textAlign:'center' }}></ListItemText>
                    <ListItemText primary={sub_total} style={{textAlign:'right',marginRight:15 }}></ListItemText>
                    
                   </Card> 
                   </form>
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
        items: state.cartReducer.items,
        loading: state.cartReducer.loading,
        error: state.checkoutReducer.error,
        sold_to:state.authReducer.username,
        status: state.checkoutReducer.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRemoveItem:(item)=>dispatch(actionCart.removeCartItem(item)),
        onGetItems:()=>dispatch(actionBrowse.getItemsOnSale(1)),
        onClearBasket:()=>dispatch(actionCart.clearBasket()),
        onCheckOutItem:(item,sold_to)=>dispatch(actionCheckOut.checkoutItem(item,sold_to))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);