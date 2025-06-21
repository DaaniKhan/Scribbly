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
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: String,
        required:  true
    }
}, { timestamps: true })

export default mongoose.model('Book', bookSchema)