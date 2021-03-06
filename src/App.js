import React, { useState } from 'react';
import { Reise } from './components/Reise';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Utgifter } from './components/Utgifter';
import './styling/index.css';

function App() {
    const Arbeidsreise = 'arbeidsreiser';
    const Besoeksreise = 'besoeksreiser';
    const UtgifterTilBomFergeEtc = 'utgifterBomFergeEtc';

    const initialState = {
        arbeidsreiser: [{ id: 0, km: 0, antall: 0 }],
        besoeksreiser: [{ id: 0, km: 0, antall: 0 }],
        utgifterBomFergeEtc: 0,
    };

    const initialErrorState = {
        message: [],
    };

    const [state, setState] = useState(initialState);
    const [reisefradrag, setReisefradrag] = useState();
    const [validationError, setError] = useState({
        message: [],
    });

    const handleAddReise = (reisetype) => {
        const newState = state[reisetype];
        const newUniqueId = Math.max(...newState.map((x) => x.id)) + 1;
        newState.push({ id: newUniqueId, km: 0, antall: 0 });
        setState({ ...state, [reisetype]: newState });
    };

    const handleDelete = (id, reisetype) => {
        const newState = state[reisetype];

        if (newState.length <= 1) {
            return;
        }

        const newStateFiltered = newState.filter((x) => x.id !== id);
        setState({ ...state, [reisetype]: newStateFiltered });
    };

    const handleOnChange = (name, value, id, reisetype) => {
        const indexToChange = state[reisetype].findIndex((x) => x.id == id);
        const newState = state[reisetype];
        newState[indexToChange][name] = value;
        setState({ ...state, [reisetype]: newState });
    };

    const handleOnChangeExpenses = (event) => {
        setState({ ...state, utgifterBomFergeEtc: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setReisefradrag('');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state),
        };
        await fetch('https://localhost:5001/api/ReiseFradrag', requestOptions)
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    setError({ message: data.errors });
                    return Promise.reject(error);
                }

                setReisefradrag(data.reisefradrag);
                setState(initialState);
                setError(initialErrorState);
            })
            .catch((error) => {
                // handle error
            });
    };

    return (
        <main>
            <div className="wrapper">
                <div>
                    <h2 className="hr-bottom">Registrer dine arbeidsreiser</h2>
                    {state.arbeidsreiser.map((x) => (
                        <Reise
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
                        <IconButton
                            aria-label="add"
                            type="button"
                            color="secondary"
                            onClick={() => handleAddReise(Arbeidsreise)}
                            style={{ margin: '0 0 0 45px' }}
                        >
                            <Icon>add_circle</Icon>
                        </IconButton>
                    </div>
                </div>
                <div>
                    <h2 className="hr-bottom">Registrer dine bes??ksreiser</h2>
                    {state.besoeksreiser.map((x) => (
                        <Reise
                            onChange={handleOnChange}
                            handleDelete={handleDelete}
                            key={x.id}
                            id={x.id}
                            km={x.km}
                            antall={x.antall}
                            reisetype={Besoeksreise}
                        />
                    ))}
                    <div>
                        <IconButton
                            aria-label="add"
                            type="button"
                            color="secondary"
                            onClick={() => handleAddReise(Besoeksreise)}
                            style={{ margin: '0 0 0 45px' }}
                        >
                            <Icon>add_circle</Icon>
                        </IconButton>
                    </div>
                </div>
                <div>
                    <h2 className="hr-bottom">Registrer dine utgifter</h2>
                    <Utgifter
                        onChange={handleOnChangeExpenses}
                        id={UtgifterTilBomFergeEtc}
                        value={state.utgifterBomFergeEtc}
                    />
                </div>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                    color="secondary"
                    endIcon={<Icon>send</Icon>}
                    style={{ display: 'flex', margin: '30px auto 10px auto', width: '572px' }}
                >
                    Send inn
                </Button>

                {reisefradrag && reisefradrag > 1 && (
                    <div className="paper flex-text-center">
                        <h3 style={{ color: 'black' }}>Beregnet reisefradrag</h3>
                        <p style={{fontSize: '40px'}}>Kr: {reisefradrag}</p>
                    </div>
                )}

                {(reisefradrag && reisefradrag <= 0 && (
                    <div className="paper flex-text-center">
                        <h3 style={{ color: 'black' }}>Beregnet reisefradrag</h3>
                        <p>Ut fra opplysningene du har gitt vil du vil ikke f?? noe reisefradrag.</p>
                    </div>
                )) ||
                    (validationError.message.length > 0 && (
                        <div className="paper flex-text-center">
                            <h3 style={{ color: 'black' }}>Fyll ut feltene f??r innsending</h3>
                        </div>
                    ))}
            </div>
        </main>
    );
}

export default App;
