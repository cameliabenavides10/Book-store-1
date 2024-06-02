import express from 'express';
import { Book } from '../models/books.js';


const router= express.Router();

// route to save a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route for get All Books from database
router.get('/', async (request, response) => {
    try {
        // Fetch all books from the database
        const books = await Book.find({});

        // Send the response
        return response.status(200).json({ count: books.length, data: books });

    } catch (error) {
        console.log('Error fetching books:', error.message);
        response.status(500).json({ error: error.message });
    }
});


// Route for get One Books from database
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        // Fetch the specific book by Id
        const book = await Book.findById(id);

        // Send the response
        return response.status(200).json(book);

    } catch (error) {
        console.log('Error fetching books:', error.message);
        response.status(500).json({ error: error.message });
    }
});

// update a book route
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' })
        }
        return response.status(200).send({ message: 'Book updated succesfully' })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// delete book route
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' })
        }
        return response.status(200).send({ message: 'Book has been deleted!' })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;