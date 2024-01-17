import authorsRouter from "./routes/authors.js";
import booksRouter from "./routes/books.js";
import cors from "cors";
import dotenv from "dotenv"; dotenv.config();
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
const { MONGO_URI } = process.env;

// SERVER SETUP
const app = express();
app.use(cors({origin:"*"}));
app.use(morgan("dev"));
app.use(express.json());


// ROUTES
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);


// DATABASE AND SERVER RUN
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Mongo connected successfully.");
        app.listen(3000, () => {
            console.log("Server is listening at port 3000.");
        });
    }).catch(err => console.error(err));