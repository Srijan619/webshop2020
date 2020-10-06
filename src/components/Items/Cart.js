import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/browse'
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
    const [open, setOpen] = useState(false);
    console.log(props.items)
    const classes = useStyles();
    const history = useHistory();
    
    const sub_total= props.items.reduce((a,b)=> a=a+parseFloat(b.price),0);
    return (
        <div>
            <div className={classes.button} >
                <IconButton onClick={() => { setOpen(!open); }}>
                    <ShoppingCartIcon style={{ fill: "white" }} />
                </IconButton>
            </div>
            {open ?
                <Card className={classes.card}>
                    <Card >
                        {props.items.map(item => {
                            return (
                                <List >
                                    <ListItem>
                                        <ListItemText primary={item.title} style={{textAlign:'left'}}></ListItemText>
                                        <ListItemText primary={item.price} style={{textAlign:'right'}}></ListItemText>
                                    </ListItem>
                                    <Divider></Divider>
                                </List>

                            )
                        })}

                    </Card>
                    <Card className={classes.total}>
                    <ListItemText primary={"Total"} style={{textAlign:'center' }}></ListItemText>
                    <ListItemText primary={sub_total} style={{textAlign:'right',marginRight:20 }}></ListItemText>
                    </Card> </Card> :
                <></>
            }


        </div >
    );
};
const mapStateToProps = (state) => {
    return {
        items: state.cartReducer.items,
        loading: state.cartReducer.loading,
        error: state.cartReducer.error
    }
}
export default connect(mapStateToProps)(Cart);