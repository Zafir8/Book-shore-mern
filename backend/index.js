import express from 'express';
import { port, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

// Middleware to parse JSON for all routes
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Message from server');
});

// Route to create a new book
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Please fill in all required fields: title, author, publishYear',
            });
        }

        const newBook = new Book({
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        });

        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ message: error.message });
    }
});

// Route to get all books
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to get one book by ID
app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});


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
