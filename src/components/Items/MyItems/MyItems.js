import React from 'react';
import AddItems from '../AddItems'
import ItemsOnSale from './ItemsOnSale'
import ItemsBought from './ItemsBought'
import ItemsSold from './ItemsSold'

const MyItems = (props) => {
  
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