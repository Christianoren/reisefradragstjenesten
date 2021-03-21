import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

export const Reise = ({ id, onChange, reisetype, handleDelete, antall, km }) => {
    const deleteAnimationClass = "paper animate__bounceOut";
    const paperAndBounceInAnimation = "paper animate__bounceIn";

    const [animation, setAnimation] = useState({
        classname: paperAndBounceInAnimation
    });

    const handleOnChange = (event) => {
        onChange(event.target.name, event.target.value, id, reisetype);
    };

    const handleOnClick = () => {
        if (id !== 0) {
            setAnimation({classname: deleteAnimationClass});
            setTimeout(() => {
                handleDelete(id, reisetype);
            }, 700);
        }
    };

    return (
        <div className={`${animation.classname}`} style={{ marginBottom: '15px' }}>
            <IconButton
                aria-label="delete"
                type="button"
                onClick={handleOnClick}
                color="secondary"
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
                color="secondary"
                onChange={handleOnChange}
                style={{ marginRight: '10px'}}
            />
            <TextField
                id="standard-basic"
                label="Antall"
                value={antall}
                type="number"
                name="antall"
                color="secondary"
                onChange={handleOnChange}
            />
        </div>
    );
};
