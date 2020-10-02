import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    root: {
        marginTop: '5%',
        maxWidth: 300,
        minWidth: 300,
        width: 'fit-content'
    },
   
   
    price: {
        fontSize: 14,
        color: 'black',
        fontWeight:'bold'
    },
    pos: {
        marginBottom: 5,
    },
    button:{
        marginTop:10
    }
});
export default function BrowseItems() {
    const classes = useStyles();
    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.pos} color="textSecondary">
                    Xbox One
                    <Divider></Divider>
                </Typography>
            
                <Typography className={classes.pos} variant="body2" component="p">
                    Description of my Xbox one with full functionality and nice looking
                    <Divider></Divider>
                </Typography>
                <Typography className={classes.pos} variant="body2"  component="p" className={classes.price}>
                    60€
                </Typography>
                <Button className={classes.button} color="primary" variant="contained">Add to cart</Button>
            </CardContent>
        </Card>

    )
}
