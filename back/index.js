import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/task.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies (if needed)
};

app.use(cors(corsOptions));

// Database connection
connectDB();

app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));