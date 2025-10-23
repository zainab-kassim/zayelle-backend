import express from 'express';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import corsMiddleware from './middleware/cors.js';
import passport from 'passport';
import userRoutes from './routes/user.routes.js'
import { addProduct } from './addProducts.js';



const PORT = 4000;

// Load environment variables if not in production
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Initialize Express application
const app = express();

// Use the CORS middleware
app.use(corsMiddleware);

app.options('/', corsMiddleware);



// To parse form data in POST request body
app.use(express.urlencoded({ extended: true }));

// To parse incoming JSON in POST request body
app.use(express.json({ limit: '2mb' }));

// Use cookieParser middleware
app.use(cookieParser());

// Initialize Passport for authentication
app.use(passport.initialize());

// Authentication-related routes
app.use('/api/auth', userRoutes);


//To handle errors
app.use((err, res) => {
    // Extract status and message from the error object, defaulting to 500 and a generic message
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    // Log the error details to the console for debugging
    console.error(err);

    // Send the error response to the client
    res.status(status).json({ message });
})


// Start the server
app.listen(PORT, () => {
    connectDb()
    console.log(`zayelle  server is running on http://localhost:${PORT}`);
});

