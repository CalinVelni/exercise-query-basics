import mongoose from "mongoose";
const {Schema, SchemaTypes, model} = mongoose;

// SIDE SCHEMA
const addressSchema = new Schema({
    street: String,
    number: Number,
    city: {
        required: true,
        type: String
    }
});


// VALIDATORS
const validateWebsite = {
    validator: val => val.includes("www."),
    message: prop => `${prop.value} is not a valid webstite.`
};


// MAIN SCHEMA
const authorSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    address: {
        required: true,
        type: addressSchema
    },
    famousFor: [String],
    website: {
        type: String,
        lowercase: true,
        validate: validateWebsite
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
});

const Author = model("Author", authorSchema);

export default Author;
