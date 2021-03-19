import React, { useState } from 'react';

export const Utgifter = ({ id, onChange, type, tittel }) => {
    const [state, setState] = useState({
        utgifterBomFergeEtc: 0,
    });

    const [error, setError] = useState({
        message: '',
    });

    const resetState = {
        utgifterBomFergeEtc: 0,
    };

    const resetErrors = {
        message: '',
    };

    const handleOnChange = (event) => {
        setState({ ...state, ...{ [event.target.name]: event.target.value } });
    };

    const validate = () => {
        if (state.utgifterBomFergeEtc <= 0) {
            setError({ message: 'Utgifter kan ikke være mindre enn eller lik 0.' });
        }

        if (state.utgifterBomFergeEtc > 0) {
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
        <div className="hr-bottom">
            <h2>{tittel}</h2>
            <div style={{ minWidth: '100%', height: '30px' }}>{error.message}</div>
            <label htmlFor={id}>Utgifter:</label>
            <input
                value={state.utgifterBomFergeEtc}
                className="margin-left"
                type="number"
                id={id}
                name="utgifterBomFergeEtc"
                onChange={handleOnChange}
            />
            <button type="button" onClick={handleOnClick} className="margin-left">
                +
            </button>
        </div>
    );
};
