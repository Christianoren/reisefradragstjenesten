import React, { useState } from 'react';
import { Arbeidsreiser } from './components/Arbeidsreiser';
import { Reise } from './components/Reise';
import { Utgifter } from './components/Utgifter';
import './styling/index.css';

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state),
        };
        const response = await fetch('https://localhost:5001/api/ReiseFradrag', requestOptions)
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                setReisefradrag(data.reisefradrag);
                setState(resetState);
            })
            .catch((error) => {
                // handle error
            });
    };

    return (
        <main className="App">
            <div className="wrapper">
					<form onSubmit={handleSubmit}>
						<Reise
							id={`${Arbeidsreise}Id`}
							onChange={handleStateChange}
							type={Arbeidsreise}
							tittel="Arbeidsreiser"
						/>

						<Reise
							id={`${Besoeksreise}Id`}
							onChange={handleStateChange}
							type={Besoeksreise}
							tittel="Besøksreiser"
						/>

						<Utgifter
							id={`${UtgifterTilBomFergeEtc}Id`}
							onChange={handleStateChange}
							type={UtgifterTilBomFergeEtc}
							tittel="Bom og ferge utgifter"
						/>
						<button type="submit" style={{ display: 'flex', margin: '20px auto 20px auto' }}>
							Send inn
						</button>
					</form>
            </div>
			<div className="wrapper">
				<Arbeidsreiser />
			</div>
            <div className="wrapper reisefradrag">
                {reisefradrag && (
                    <div>
                        <h3>Reisefradrag</h3>
                        <p>{reisefradrag}</p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default App;
