import mongoose from "mongoose";
const {Schema, SchemaTypes, model} = mongoose;

const bookSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: SchemaTypes.ObjectId,
        ref: "Author"
    },
    year: Number,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
});
const Book = model("Book", bookSchema);

export default Book;
