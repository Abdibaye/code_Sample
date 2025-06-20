// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db.js'; // Correctly imports the default export

import userRoutes from './routes/userRout.js'; 
import errorHandler from './middleware/errorHandler.js';
import createUserTable from './data/createUserTable.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', userRoutes);  


// Error handling middleware
app.use(errorHandler);


//Create Table if it doesn't exist
createUserTable();

// Test PostgreSQL connection route
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`The database time is: ${result.rows[0].now}`);
  } catch (error) {
    console.error('❌ Error connecting to the database', error);
    res.status(500).send('Error connecting to the database');
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
