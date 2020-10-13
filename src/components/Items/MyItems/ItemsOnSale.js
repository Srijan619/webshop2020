import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/browse'
import * as actionAdd from '../../../store/actions/cartAction'
import * as actionEdit from '../../../store/actions/editItem'
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { IconButton } from '@material-ui/core';

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
        marginLeft: '1%',
        display: 'flex',
        flexFlow: 'row wrap',

    },
    price: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
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

const ItemsOnSale = (props) => {
    const [disabled, setDisabled] = useState(true);
    const [id, setId] = useState(0)
    const [saveDisabled, setSaveDisabled] = useState(true)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        props.onGetItems();
        // eslint-disable-next-line
    }, []);

    const classes = useStyles();
    const enableEdit = (e, id) => {
        setId(id)
        setDisabled(!disabled)
        setSaveDisabled(!saveDisabled)

    }
    const saveEdit = (e, id) => {
        props.onEditItem(id, price)
        setDisabled(!disabled)
        setSaveDisabled(!saveDisabled)
    }
    let message = null;
    if (props.error || props.errorEdit) {
        message = (
            <div>
                <p>{props.error.message}</p>
                <p>{props.errorEdit.message}</p>
            </div>
        );
    }
    else if(props.editStatus===201) {
        message = (<p>Successfully Saved</p>)
    }
    const data = Array.from(props.items) // Converts dictionary to array which solves map problem
    return (
        <>
            {message}
            <Typography variant="h5" style={{ marginLeft: '1%' }}>My Items on Sale</Typography>
            <div className={classes.container}>

                {props.loading ? <div>Loading..</div>
                    :

                    <>
                        {data.map(item => {
                            if (!item.sold_status && item.posted_by === props.username)
                                return (
                                    <Card className={classes.root} key={item.id}>
                                        <CardContent>

                                            <Typography className={classes.pos} color="textSecondary" component="span">
                                                {item.title}
                                                <IconButton onClick={(e) => { enableEdit(e, item.id) }}><EditIcon></EditIcon></IconButton>
                                                <IconButton onClick={(e) => { saveEdit(e, item.id) }} disabled={item.id === id ? saveDisabled : true}><DoneIcon ></DoneIcon></IconButton>
                                                <Divider></Divider>
                                            </Typography>

                                            <Typography className={classes.pos} variant="body2" component="span">
                                                {item.description}
                                                <Divider></Divider>
                                            </Typography>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <TextField onChange={(e) => { setPrice(e.target.value) }} disabled={item.id === id ? disabled : true} className={classes.price} defaultValue={item.price} >
                                                </TextField>
                                                <span>€</span>
                                            </div>
                                            <Divider></Divider>

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
        items: state.browseReducer.items,
        loading: state.browseReducer.loading,
        error: state.browseReducer.error,
        username: state.authReducer.username,
        errorEdit: state.editItemReducer.error,
        editStatus:state.editItemReducer.status
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetItems: () => dispatch(actions.getItems()),
        onAddToBasket: (item) => dispatch(actionAdd.addToBasket(item)),
        onEditItem: (id, price) => dispatch(actionEdit.editItem(id, price))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemsOnSale);