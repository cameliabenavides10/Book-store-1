import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from  './models/books.js';
const app = express();

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('My Book Store App')
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