import React, { useEffect, useState } from 'react';
import { ReiseX } from './ReiseX';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export const Arbeidsreiser = () => {
    const [state, setState] = useState({
        reiser: [{id: 0, km: 0, antall: 0}],
        besoeksreiser: [{id: 0, km: 0, antall: 0}]
    });
    
    const handleAddReise = () => {
        const newState = state.reiser;
        const newUniqueId = Math.max(...newState.map(x => x.id)) + 1;
        newState.push({id: newUniqueId, km: 0, antall: 0 });
        setState({reiser: newState});
    }

    const handleDelete = (id) => {
        const newState = state.reiser;

        if (newState.length <= 1)
        {
            return;
        }
        
        const newStateFiltered = newState.filter(x => x.id !== id)
        setState({reiser: newStateFiltered});
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
            {state.reiser.map((x, index) => <ReiseX onChange={handleOnChange} handleDelete={handleDelete} key={index} id={x.id} km={x.km} antall={x.antall} />)}
            <div>
                <IconButton aria-label="add" type="button" onClick={handleAddReise} style={{marginRight: '10px'}}>
                    <Icon>add_circle</Icon>
                </IconButton>
            </div>
        </div>
    );
}