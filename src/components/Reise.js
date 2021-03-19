import React, { useState } from 'react';

export const Reise = ({ id, onChange, type, tittel }) => {
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
        const isValid = validate();
        if (!isValid) {
            return;
        }

        onChange(state, type);
        setState(resetState);
    };

    return (
        <>
            <h3 style={{ color: '#1362ae' }}>
                {tittel}
            </h3>
            <div style={{ minWidth: '100%', height: '30px' }}>{error.message}</div>
            <div>
                <label htmlFor={id} style={{ width: '100%' }}>
                    Kilometer:
                </label>
                <input value={state.km} type="number" id={id} name="km" onChange={handleOnChange} />
            </div>

            <div>
                <label htmlFor={id}> Antall: </label>
                <input value={state.antall} type="number" id={id} name="antall" onChange={handleOnChange} />
            </div>

            <button onClick={handleOnClick}>+</button>
        </>
    );
};
