import React, { useState } from 'react';
import { Reise } from './components/Reise';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { Utgifter } from './components/Utgifter';
import './styling/index.css';

function App() {
    const Arbeidsreise = 'arbeidsreiser';
    const Besoeksreise = 'besoeksreiser';
    const UtgifterTilBomFergeEtc = 'utgifterBomFergeEtc';

    const initialState = {
        arbeidsreiser: [{ id: 0, km: 0, antall: 0 }],
        besoeksreiser: [{ id: 0, km: 0, antall: 0 }],
        utgifterBomFergeEtc: 0
    };

    const [state, setState] = useState(initialState);
    const [reisefradrag, setReisefradrag] = useState();

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
        setState({ ...state, utgifterBomFergeEtc: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                    return Promise.reject(error);
                }

                setReisefradrag(data.reisefradrag);
                setState(initialState);
            })
            .catch((error) => {
                // handle error
            });
    };

    return (
        <main className="App">
            <div className="wrapper">
                <div className="hr-bottom">
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
                        <IconButton aria-label="add" type="button" onClick={() => handleAddReise(Arbeidsreise)} style={{ marginRight: '10px' }}>
                            <Icon>add_circle</Icon>
                        </IconButton>
                    </div>
                </div>
                <div className="hr-bottom">
                    <h2 className="hr-bottom">Registrer dine besøksreiser</h2>
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
                        <IconButton aria-label="add" type="button" onClick={() => handleAddReise(Besoeksreise)} style={{ marginRight: '10px' }}>
                            <Icon>add_circle</Icon>
                        </IconButton>
                    </div>
                </div>
                <div>
                    <Utgifter onChange={handleOnChangeExpenses} id={UtgifterTilBomFergeEtc} value={state.utgifterBomFergeEtc}/>
                </div>
                <button type="submit" onClick={handleSubmit}>Send inn</button>

                <div className="reisefradrag">
                    {reisefradrag && (
                        <div>
                            <h3>Reisefradrag</h3>
                            <p>{reisefradrag}</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default App;
