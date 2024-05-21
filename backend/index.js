import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/books.js';

const app = express();

//middleware to parse the request body
app.use(express.json());


app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('My Book Store App')
});

// route to save a new book
app.post('/books', async (request, response) => {
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
app.get('/books', async (request, response) => {
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
app.get('/books/:id', async (request, response) => {
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
app.put('/books/:id', async (request, response) => {
    try{ 
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
if(!result){
    return response.status(404).json({message: 'Book not found'})
}
return response.status(200).send({message: 'Book updated succesfully'})
    } catch (error) {
console.log(error.message);
response.status(500).send({message: error.message});
    }
});




mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App is connected successfully to database:)');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    });