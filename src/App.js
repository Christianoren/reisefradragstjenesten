import React, { useState } from 'react';
import { Reise } from './components/Reise';
import { Utgifter } from './components/Utgifter';

function App() {
    const [state, setState] = useState({
        arbeidsreiser: [],
        besoeksreiser: [],
        utgifterBomFergeEtc: 0,
    });

	const resetState = {
		arbeidsreiser: [],
        besoeksreiser: [],
        utgifterBomFergeEtc: 0,
	};

    const [reisefradrag, setReisefradrag] = useState();

    const Arbeidsreise = 'arbeidsreise';
    const Besoeksreise = 'besoeksreise';
    const UtgifterTilBomFergeEtc = 'utgifterBomFergeEtc';

    const handleStateChange = (value, type) => {
        if (type === Arbeidsreise) {
            const newState = state.arbeidsreiser;
            newState.push(value);
            setState({ ...state, arbeidsreiser: newState });
            console.log('Updated App state');
        }

        if (type === Besoeksreise) {
            const newState = state.besoeksreiser;
            newState.push(value);
            setState({ ...state, besoeksreiser: newState });
            console.log('Updated App state');
        }

        if (type === UtgifterTilBomFergeEtc) {
            setState({ ...state, utgifterBomFergeEtc: value.utgifterBomFergeEtc });
            console.log('Updated App state');
        }
    };

    const handleSubmit = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(state),
        };
        const response = await fetch('https://localhost:5001/api/ReiseFradrag', requestOptions);
        const data = await response.json();
        setReisefradrag(data.reisefradrag);
		setState(resetState);
    };

    return (
        <main className="App">
            <h1>Reisefradragstjenesten</h1>
            <div
                style={{
                    width: '600px',
                    border: '1px solid gray',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                }}
            >
                <Reise
                    id={`${Arbeidsreise}Id`}
                    onChange={handleStateChange}
                    type={Arbeidsreise}
                    tittel="Registrer dine arbeidsreiser"
                />

                <Reise
                    id={`${Besoeksreise}Id`}
                    onChange={handleStateChange}
                    type={Besoeksreise}
                    tittel="Registrer dine besøksreiser"
                />

                <Utgifter
                    id={`${UtgifterTilBomFergeEtc}Id`}
                    onChange={handleStateChange}
                    type={UtgifterTilBomFergeEtc}
                    tittel="Registrer dine bom og ferge utgifter"
                />
            </div>
            <button onClick={handleSubmit}>Send inn</button>
            {reisefradrag}
        </main>
    );
}

export default App;
