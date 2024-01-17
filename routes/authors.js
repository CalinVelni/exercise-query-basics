import Author from "../models/authors.js";
import express from "express";

// ROUTER SETTING
const router = express.Router();
router.use(express.json());


// CREATE RESOURCE
router.post("/", async (req, res) => {
    try{
        const author = new Author(req.body);
        await author.save();
        res.send(author);
    }catch(err){
        res.status(400).send(err.message);
    }
});


// READ RESOURCE LIST
router.get("/", async (req, res) => {
    try{
        const authors = await Author.find();
        res.send(authors);
    }catch(err){
        res.status(500).send(err.message);
    }
});


// READ SINGLE RESOURCE
router.get("/:id", async (req, res) => {
    try{
        const author = await Author.findById(req.params.id);
        res.send(author);
    }catch(err){
        res.status(404).send(err.message);
    }
});


// UPDATE WHOLE RESOURCE
router.put("/:id", async (req, res) => {
    try{
        let author = await Author.findById(req.params.id);
        author.set(req.body);
        await author.save();
        res.send(author);
    }catch(err){
        res.status(400).send(err.message);
    }
});


// UPDATE RESOURCE PROPS
router.patch("/:id", async (req, res) => {
    try{
        let author = await Author.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            context: "query"
        });
        res.send(author);
    }catch(err){
        res.status(400).send(err.message);
    }
});


// DELETE RESOURCE
router.delete("/:id" ,async (req, res) => {
    try{
        await Author.findByIdAndDelete(req.params.id);
        res.send(`Authors with ID ${req.params.id} deleted successfully.`)
    }catch(err){
        res.status(404).send(err.message);
    }
});

export default router;
