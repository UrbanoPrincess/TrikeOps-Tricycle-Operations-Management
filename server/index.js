require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve the frontend from the correct build directory
app.use(express.static(path.join(__dirname, '../build')));

// API route for sending a message
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

// API route for getting drivers from the database
app.get('/api/drivers', async (req, res) => {
    try {
        const conn = await db.getConnection();
        const rows = await conn.query("SELECT * FROM drivers");
        conn.release();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query error' });
    }
});

// Handle all other routes and serve the frontend's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

db.getConnection()
    .then(conn => {
        console.log("Connected to MariaDB");
        conn.release();
    })
    .catch(err => {
        console.error("Unable to connect to MariaDB", err);
    });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
