import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

export const Reise = ({ id, onChange, reisetype, handleDelete, antall, km }) => {

    const handleOnChange = (event) => {
        onChange(event.target.name, event.target.value, id, reisetype);
    };

    const handleOnClick = () => {
        handleDelete(id, reisetype);
    };

    return (
        <div style={{ marginBottom: '15px' }}>
            <IconButton
                aria-label="delete"
                type="button"
                onClick={handleOnClick}
                style={{ marginRight: '10px' }}
            >
                <DeleteIcon />
            </IconButton>
            <TextField
                id="standard-basic"
                label="Kilometer"
                value={km}
                type="number"
                name="km"
                onChange={handleOnChange}
                style={{ marginRight: '20px' }}
            />
            <TextField
                id="standard-basic"
                label="Antall"
                value={antall}
                type="number"
                name="antall"
                onChange={handleOnChange}
            />
        </div>
    );
};
