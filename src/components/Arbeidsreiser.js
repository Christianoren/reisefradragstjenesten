import React, { useState } from 'react';
import { ReiseX } from './ReiseX';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export const Arbeidsreiser = () => {
    const Arbeidsreise = 'arbeidsreiser';
    const Besoeksreise = 'besoeksreiser';
    const UtgifterTilBomFergeEtc = 'utgifterBomFergeEtc';

    const [state, setState] = useState({
        arbeidsreiser: [{ id: 0, km: 0, antall: 0 }],
        besoeksreiser: [{ id: 0, km: 0, antall: 0 }],
    });

    const handleAddReise = (reisetype) => {
        const newState = state[reisetype];
        const newUniqueId = Math.max(...newState.map((x) => x.id)) + 1;
        newState.push({ id: newUniqueId, km: 0, antall: 0 });
        setState({ [reisetype]: newState });
    };

    const handleDelete = (id, reisetype) => {
        const newState = state[reisetype];

        if (newState.length <= 1) {
            return;
        }

        const newStateFiltered = newState.filter((x) => x.id !== id);
        setState({ [reisetype]: newStateFiltered });
    };

    const handleOnChange = (name, value, id, reisetype) => {
        const indexToChange = state[reisetype].findIndex((x) => x.id == id);
        const newState = state[reisetype];
        newState[indexToChange][name] = value;
        setState({ ...state, [reisetype]: newState });
    };

    return (
        <div>
            <h2 className="hr-bottom">Registrer dine arbeidsreiser</h2>
            {state.arbeidsreiser.map((x) => (
                <ReiseX
                    onChange={handleOnChange}
                    handleDelete={handleDelete}
                    key={x.id}
                    id={x.id}
                    km={x.km}
                    antall={x.antall}
                    reisetype={Arbeidsreise}
                />
            ))}
            <div>
                <IconButton aria-label="add" type="button" onClick={() => handleAddReise(Arbeidsreise)} style={{ marginRight: '10px' }}>
                    <Icon>add_circle</Icon>
                </IconButton>
            </div>
        </div>
    );
};
