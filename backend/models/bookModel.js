import mongoose from "mongoose";

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required:true
    },
    notes: {
        type: String,
    }
}, { timestamps: true })

export default mongoose.model('Book', bookSchema)