import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/browse'
import * as actionAdd from '../../../store/actions/cartAction'

const useStyles = makeStyles({
    root: {
        marginRight: '1%',
        marginBottom: '2%',
        maxWidth: 400,
        minWidth: 400,
        width: 'fit-content'
    },

    container: {
        marginTop: '1%',
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
const ItemsSold = (props) => {

    useEffect(() => {
        props.onGetItems();
        // eslint-disable-next-line
    }, []);

    const classes = useStyles();

    const data= Array.from(props.items) // Converts dictionary to array which solves map problem
    return (
        <>
            
            <Typography variant="h5" style={{marginLeft:'1%'}}>Items Sold</Typography>
            <div className={classes.container}>

                {props.loading ? <div>Loading..</div>
                    :

                    <>
                        {data.map(item => {
                            if (item.sold_status && item.posted_by === props.username)
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
                                        </CardContent>
                                    </Card>
                                )
                        }

                        )}

                    </>
                }
            </div>
        </>

    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        items: state.browseReducer.items,
        loading: state.browseReducer.loading,
        error: state.browseReducer.error,
        username: state.authReducer.username
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetItems: () => dispatch(actions.getItems()),
        onAddToBasket: (item) => dispatch(actionAdd.addToBasket(item))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemsSold);