import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/browse'

const useStyles = makeStyles({
    root: {
        marginTop: '5%',
        marginRight: '1%',
        maxWidth: 300,
        minWidth: 300,
        width: 'fit-content'
    },

    container:{
      display:'flex',
      flexDirection:'row',
     
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
    }
});
const BrowseItems = (props) => {

    useEffect(() => {
        props.onGetItems();
    }, []);

    const classes = useStyles();


    return (
        <div className={classes.container}>
            {props.loading ? <div>Loading..</div>
                :

                <>
                    {props.items.map(item =>
                        (
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {item.title}
                                        <Divider></Divider>
                                    </Typography>

                                    <Typography className={classes.pos} variant="body2" component="p">
                                        {item.description}
                                        <Divider></Divider>
                                    </Typography>
                                    <Typography className={classes.pos} variant="body2" component="p" className={classes.price}>
                                        {item.price}
                                    </Typography>
                                    <Button className={classes.button} color="primary" variant="contained">Add to cart</Button>
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
        items: state.browseReducer.items,
        loading: state.browseReducer.loading,
        error: state.browseReducer.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetItems: () => dispatch(actions.getItems())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BrowseItems);