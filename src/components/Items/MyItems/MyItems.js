import React ,{useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddItems from '../AddItems'
import ItemsOnSale from './ItemsOnSale'
import ItemsBought from './ItemsBought'
import ItemsSold from './ItemsSold'

const MyItems = (props) => {
    const classes = useStyles();
    useEffect(() => {
        document.title="My Items"
        console.log(window.innerWidth)
         // eslint-disable-next-line
      });
    return (
        <div className={classes.container}>
            <AddItems></AddItems>
            <ItemsOnSale></ItemsOnSale>
            <ItemsBought></ItemsBought>
            <ItemsSold></ItemsSold>
        
        </div>

    );
};

const useStyles = makeStyles({
    container: {
        marginTop: window.innerHeight /15,
    }
});
export default (MyItems);