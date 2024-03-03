import express from 'express';
import { port, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import bookRoute from './Routes/bookRoute.js';
import cors from 'cors';

const app = express();

// Middleware to parse JSON for all routes
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Message from server');
});

app.use('/books', bookRoute);



mongoose
    .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log('Error:', error);
    });
