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

const useStyles = makeStyles({
    root: {
        marginTop: '5%',
        marginRight: '1%',
        maxWidth: 300,
        minWidth: 300,
        width: 'fit-content'
    },

    container: {
        display: 'flex',
        flexDirection: 'row',

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

    useEffect(() => {
        props.onGetItems();
        // eslint-disable-next-line
    }, []);

    const classes = useStyles();


    const addToBasket = (item,e) => {
       props.onAddToBasket(item);
    }

    return (
        <div className={classes.container}>
            {props.loading ? <div>Loading..</div>
                :

                <>
                    {props.items.map(item =>
                        (
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
                                    {props.isAuthenticated ? <Button className={classes.button} color="primary" variant="contained" onClick={(e) => addToBasket(item, e)} >Add to cart</Button> : <></>}

                                </CardContent>
                            </Card>
                        ))}

                </>
            }
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        items: state.browseReducer.items,
        loading: state.browseReducer.loading,
        error: state.browseReducer.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetItems: () => dispatch(actions.getItems()),
        onAddToBasket: (item) => dispatch(actionAdd.addToBasket(item))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BrowseItems);