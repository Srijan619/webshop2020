import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/browse'
import * as actionAdd from '../../store/actions/cartAction'
import MoreIcon from '@material-ui/icons/More';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        marginRight: '1%',
        marginBottom: '2%',
        maxWidth: 400,
        minWidth: 400,
        maxHeight:200,
        height:'fit-content',
        width: 'fit-content',
      
    },
    container: {
        marginTop: window.innerHeight/10,
        marginLeft:'1%',
        display: 'flex',
        flexFlow: 'row wrap',
      
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
    const[page,setPage]=useState(1)
    useEffect( () => {
     document.title="Browse the Shop"
     props.onGetItemsOnSale(page); //Filters On Sale Items
    // eslint-disable-next-line

    },[]);
    
 
    const handleLoadMore=()=>{
     
     let getPage=page+1
     setPage(getPage)
     if(!props.nextItem) return;
     props.onGetItemsOnSale(getPage)
  
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
  
    const data= Array.from(props.itemsLimited)
 
    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }
    return (
        <>
            {errorMessage}
      
            {props.loading ? <div>Loading......</div>
                :
<>
                <div className={classes.container}>
                    {data.map(item =>
                        {
                          
                            if (item.posted_by!==props.username)
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
                                )
                         }
                        )}

                </div>
                {!props.nextItem?<Typography>No more items to load.....</Typography>:<IconButton onClick={handleLoadMore}> <MoreIcon></MoreIcon> Load More</IconButton>}
                </>
            }
          
     
        </>

    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        loading: state.browseReducer.loading,
        error: state.browseReducer.error,
        itemsCart:state.cartReducer.items,
        username:state.authReducer.username,
        itemsLimited:state.browseReducer.itemLimited,
        nextItem:state.browseReducer.next
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetItemsOnSale: (page) => dispatch(actions.getItemsOnSale(page)),
        onAddToBasket: (item) => dispatch(actionAdd.addToBasket(item)),
    
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BrowseItems);