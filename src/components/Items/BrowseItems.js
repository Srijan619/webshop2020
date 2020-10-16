import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/browse'
import * as actionAdd from '../../store/actions/cartAction'

const useStyles = makeStyles({
    root: {
        marginRight: '1%',
        marginBottom: '2%',
        maxWidth: 400,
        minWidth: 400,
        width: 'fit-content',
      
    },
    container: {
        marginTop: '5%',
        marginLeft:'1%',
        display: 'flex',
        flexFlow: 'row wrap',
        overflowY:'scroll',
        height:"80vh"
    },
    price: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold'
    },
    pos: {
        marginBottom: 5,
    },
    button: {
        marginTop: 10
    },
    date: {
        fontSize: 12,
        color: 'grey',

    }
});
const BrowseItems = (props) => {

    useEffect( () => {
        props.onGetItems(); //Filters On Sale Items
        console.log("Hello")

    // eslint-disable-next-line

    },[]);
    
    // window.onscroll=()=>{
    //     if(props.error||props.loading||!props.hasMore) return;
    //     if(document.documentElement.scrollHeight-document.documentElement.scrollTop===document.documentElement.clientHeight)
    //     {
            
    //         console.log("HelloScroll")
    //     }
    //     console.log("Hello")
    // }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { 
            console.log("bottom")
        }
     }
    const classes = useStyles();


    const addToBasket = (item,e) => {
        
       let duplicate=false;
       const dataCart=Array.from(props.itemsCart);
      
       
       if(dataCart.length!==0){
         dataCart.map(data=>{
           if(data.id===item.id){
            duplicate=true;
           }
       })}
      if(!duplicate){
        props.onAddToBasket(item)
      }
    }
  
    const data= Array.from(props.items)

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }
    return (
        <>
            {errorMessage}
      
            {props.loading ? <div>Loading..</div>
                :

                <div className={classes.container} onScroll={handleScroll}>
                    {data.map(item =>
                        {
                            if (!item.sold_status&&item.posted_by!==props.username)
                                return (
                            <Card className={classes.root} key={item.id}>
                                <CardContent>
                                    <Typography className={classes.pos} color="textSecondary" component="span">
                                        {item.title}
                                        <Divider></Divider>
                                    </Typography>

                                    <Typography className={classes.pos} variant="body2" component="span">
                                        {item.description}
                                        <Divider></Divider>
                                    </Typography>
                                    <Typography variant="body2" component="span" className={classes.price}>
                                        {item.price}€
                                        <Divider></Divider>
                                    </Typography>
                                    <Typography variant="body2" className={classes.date}>
                                        {item.created_date.substring(0, 10)} / {item.posted_by}
                                    </Typography>
                                    {props.isAuthenticated && item.posted_by!==props.username ? <Button className={classes.button} color="primary" variant="contained" onClick={(e) => addToBasket(item, e)} >Add to cart</Button> : <></>}

                                </CardContent>
                            </Card>
                                )}
                        )}

                </div>
            }
          
     
        </>

    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        items: state.browseReducer.items,
        loading: state.browseReducer.loading,
        error: state.browseReducer.error,
        itemsCart:state.cartReducer.items,
        username:state.authReducer.username,
        offset:state.browseReducer.offset,
        limit:state.browseReducer.limit,
        itemsLimited:state.browseReducer.itemLimited
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetItems: () => dispatch(actions.getItems()),
        onAddToBasket: (item) => dispatch(actionAdd.addToBasket(item)),
        onLoadLimitItems:(offset,limit)=>dispatch(actions.getLimitedItems(offset,limit))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BrowseItems);