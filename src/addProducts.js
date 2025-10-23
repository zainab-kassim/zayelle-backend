import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './models/product.model.js';

dotenv.config()
const collectionId = new mongoose.Types.ObjectId('672ff37b169ba3282a4d102a');


const newProduct = {
    name: 'Zayelle Luxe Weave',
    images: ['https://images.unsplash.com/photo-1760715756584-9a88f2b272c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600'],
    description: 'This is a longsleeve Aso OKe & Ankara crafted piece ',
    price: 49000,
    size: ['S', 'M', 'L', 'XL'],
    quantity: 2,
    CollectionId: collectionId
}

export async function addProduct() {
    try {
        const dbUrl = process.env.DB_URL
        // Connect to MongoDB
        await mongoose.connect(dbUrl,);

        // Create a new Product instance with the data
        const product = new Product(newProduct);

        // Save the new product to the database
        await product.save();

        console.log('New product added successfully:', product);

        // Close the MongoDB connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

addProduct()
