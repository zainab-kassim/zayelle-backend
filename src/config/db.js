import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default function connectDb() {
    // Get the MongoDB connection URL from environment variables
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
        console.error('Database URL is not defined in the environment variables');
    }

    // Connect to MongoDB without deprecated options
    mongoose.connect(dbUrl)
        .then(() => console.log('Zayelle app has connected to the database'))
        .catch(err => {
            console.error('Error connecting to database:', err);
        });
}
