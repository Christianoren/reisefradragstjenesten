import React, { useState } from 'react';
import { ReiseX } from './ReiseX';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export const Arbeidsreiser = () => {
    const [state, setState] = useState({
        reiser: [{id: 0, km: 0, antall: 0}]
    });
    
    const handleAddReise = () => {
        const newState = state.reiser;
        newState.push({id: state.reiser.length, km: 0, antall: 0 });
        setState({reiser: newState});   
    }

    const handleDelete = (idx) => {
        const newState = state.reiser.filter(x => x.id !== idx)
        setState({reiser: newState});
    }

    const handleOnChange = (name, value, id) => {
        const indexToChange = state.reiser.findIndex(x => x.id == id);
        const newState = state.reiser;
        newState[indexToChange][name] = value;
        setState({...state, reiser: newState})
    }

    return(
        <div>
            <h2 className="hr-bottom">Registrer dine arbeidsreiser</h2>
            {state.reiser.map((x, index) => <ReiseX onChange={handleOnChange} handleDelete={handleDelete} key={index} id={x.id} />)}
            <div>
                <IconButton aria-label="add" type="button" onClick={handleAddReise} style={{marginRight: '10px'}}>
                    <Icon style={{ color: green[500] }}>add_circle</Icon>
                </IconButton>
            </div>

        </div>
    );
}