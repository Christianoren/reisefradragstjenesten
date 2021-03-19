import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export const ReiseX = ({ id, onChange, type, tittel, handleDelete, index }) => {
    const classes = useStyles();

    const [state, setState] = useState({
        km: 0,
        antall: 0,
    });

    const [error, setError] = useState({
        message: '',
    });

    const resetState = {
        km: 0,
        antall: 0,
    };

    const resetErrors = {
        message: '',
    };

    const handleOnChange = (event) => {
        setState({ ...state, ...{ [event.target.name]: event.target.value } });
        onChange(event.target.name, event.target.value, id);
    };

    const validate = () => {
        if (state.antall <= 0) {
            setError({ message: 'Antall kan ikke være mindre enn eller lik 0.' });
        }

        if (state.km <= 0) {
            setError({ message: 'Kilometer kan ikke være mindre enn eller lik 0.' });
        }

        if (state.antall > 0 && state.km > 0) {
            setError(resetErrors);
            return true;
        }
    };

    const handleOnClick = () => {
        // const isValid = validate();
        // if (!isValid) {
        //     return;
        // }

        // onChange(state, type);
        // setState(resetState);

        handleDelete(id);
    };

    return (
        <div style={{marginBottom: '15px'}}>
            <div style={{ minWidth: '100%', height: '30px' }}>{error.message}</div>
            <IconButton aria-label="delete" className={classes.margin} type="button" onClick={handleOnClick} style={{marginRight: '10px'}}>
                <DeleteIcon />
            </IconButton>
            <TextField
                id="standard-basic"
                label="Kilometer"
                value={state.km}
                type="number"
                name="km"
                onChange={handleOnChange}
                style={{ marginRight: '20px' }}
            />
            <TextField
                id="standard-basic"
                label="Antall"
                value={state.antall}
                type="number"
                name="antall"
                onChange={handleOnChange}
            />

        </div>
    );
};
