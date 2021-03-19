import React, { useState } from 'react';
import { Reise } from './components/Reise';

function App() {
    const [state, setState] = useState({
		arbeidsreiser: []
    });

	const Arbeidsreise = 'arbeidsreise';
	const Besoeksreise = 'besoeksreise';

	const handleOnChangeArbeidsreise = (arbeidsreise, type) => {
		if (type === Arbeidsreise) {
			var arbeidsreiserJoined = state.arbeidsreiser;
			arbeidsreiserJoined.push(arbeidsreise)
			setState({arbeidsreiser: arbeidsreiserJoined});
			console.log('Updated App state');
		}
	}

    return (
        <main className="App">
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
                <h1 style={{ color: '#1362ae' }}>
                    Legg inn dine arbeidsreiser
                </h1>

				<Reise id={`arbeidsreiseId`} onChange={handleOnChangeArbeidsreise} type='arbeidsreise' />
			</div>
        </main>
    );
}

export default App;
