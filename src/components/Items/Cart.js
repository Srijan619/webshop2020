import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
   

    const classes = useStyles();
    const history = useHistory();
    
    const sub_total= data.reduce((a,b)=> a=a+parseFloat(b.price),0); //Calculating total

    const removeItem=(item,e)=>{
        props.onRemoveItem(item)
    }

    const checkoutItem=(e)=>{
        props.onCheckOutItem(data,props.sold_to);
        props.onGetItems();
        props.onClearBasket();
    }
  
    return (
        <div>
            <div className={classes.button} >
                <IconButton onClick={() => { setOpen(!open); }}>
                    <ShoppingCartIcon style={{ fill: "white" }} />
                    <Typography  style={{ color: "white" }} >{data.length}</Typography>
                   
                </IconButton>
            </div>
            {open ?
                <Card className={classes.card}>
                    <Card >
                        
                        {data.map(item => {
                            return (
                                <List>
                                    <ListItem  key={item.id}>
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
                        {data.length?  <Button  onClick={(e) => checkoutItem()} variant="contained"  style={{float:"right"}}>CheckOut</Button>
               :<></>}
                       <ListItemText primary={"Total"} style={{textAlign:'center' }}></ListItemText>
                    <ListItemText primary={sub_total} style={{textAlign:'right',marginRight:15 }}></ListItemText>
                    
                   </Card> 
     </Card> :
                <></>
            }


        </div >
    );
};
const mapStateToProps = (state) => {
    return {
        items: state.cartReducer.items,
        loading: state.cartReducer.loading,
        error: state.cartReducer.error,
        sold_to:state.authReducer.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRemoveItem:(item)=>dispatch(actionCart.removeCartItem(item)),
        onGetItems:()=>dispatch(actionBrowse.getItems()),
        onClearBasket:()=>dispatch(actionCart.clearBasket()),
        onCheckOutItem:(item,sold_to)=>dispatch(actionCheckOut.checkoutItem(item,sold_to))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);