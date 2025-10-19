import React, { useEffect, useState } from 'react';

function App() {
	const [health, setHealth] = useState(null);
	const apiUrl = process.env.REACT_APP_API_URL || 'http://api.tomeofsouls.com';

	useEffect(() => {
		fetch(`${apiUrl}/health`)
			.then(res => res.json())
			.then(data => setHealth(data))
			.catch(err => console.error(err));
	}, [apiUrl]);

	return (
		<div style={{ padding: '20px' }}>
			<h1>Tome of Souls</h1>
			<p>Backend Status: {health ? health.status : 'Loading...'}</p>
			<p>Environment: {health ? health.environment : 'Unknown'}</p>
		</div>
	);
}

export default App;
