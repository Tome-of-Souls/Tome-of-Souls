const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Database connections
const authPool = new Pool({
	connectionString: process.env.AUTH_DATABASE_URL,
});

const charPool = new Pool({
	connectionString: process.env.CHAR_DATABASE_URL,
});

const sheetPool = new Pool({
	connectionString: process.env.SHEET_DATABASE_URL,
});

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
	res.json({ status: 'ok', environment: process.env.NODE_ENV });
});

// Auth endpoints
app.post('/api/auth/register', async (req, res) => {
	// Uses authPool
});

// Character endpoints
app.get('/api/characters', async (req, res) => {
	try {
		const result = await charPool.query('SELECT * FROM characters');
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Database query failed' });
	}
});

// Sheet endpoints
app.get('/api/sheets/:id', async (req, res) => {
	try {
		const results = await sheetPool.query('SELECT * FROM sheets WHERE id = $1', [req.params.id]);
		res.json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Database query failed' });
	}
});

app.listen(port, () => {
	console.log('Server running on port ${port}');
});
