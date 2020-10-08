import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddItems from '../AddItems'
import ItemsOnSale from './ItemsOnSale'
import ItemsBought from './ItemsBought'
import ItemsSold from './ItemsSold'

const useStyles = makeStyles({
    
});
const MyItems = (props) => {
    const classes = useStyles();
    return (
        <div>
            <AddItems></AddItems>
            <ItemsOnSale></ItemsOnSale>
            <ItemsBought></ItemsBought>
            <ItemsSold></ItemsSold>
        
        </div>

    );
};

export default (MyItems);