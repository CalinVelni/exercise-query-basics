import Book from "../models/books.js";
import dotenv from "dotenv"; dotenv.config();
import express from "express";
const { MONGO_URI } = process.env;

// ROUTER SETTING
const router = express.Router();
router.use(express.json());


// CREATE RESOURCE
router.post("/", async (req, res) => {
    try{
        const book = new Book(req.body);
        await book.save();
        res.send(book);
    }catch(err){
        res.status(400).send(err.message);
    }
});


// READ RESOURCE LIST
router.get("/", async (req, res) => {
    try{
        const books = await Book.find().populate("author", "name");
        res.send(books);
    }catch(err){
        res.status(500).send(err.message);
    }
});


// READ SINGLE RESOURCE
router.get("/:id", async (req, res) => {
    try{
        const book = await Book.findById(req.params.id).populate("author", ["name", "age", "website", "createdAt"]);
        res.send(book);
    }catch(err){
        res.status(404).send(err.message);
    }
});


// UPDATE WHOLE RESOURCE
router.put("/:id", async (req, res) => {
    try{
        let book = await Author.findById(req.params.id);
        book.set(req.body);
        await book.save();
        res.send(book);
    }catch(err){
        res.status(400).send(err.message);
    }
});


// UPDATE RESOURCE PROPS
router.patch("/:id", async (req, res) => {
    try{
        let book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            context: "query"
        });
        res.send(book);
    }catch(err){
        res.status(400).send(err.message);
    }
});


// DELETE RESOURCE
router.delete("/:id" ,async (req, res) => {
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.send(`Book with ID ${req.params.id} deleted successfully.`)
    }catch(err){
        res.status(404).send(err.message);
    }
});

export default router;
