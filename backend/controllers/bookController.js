import Book from "../models/bookModel.js"
import mongoose from "mongoose"

// get all books
const getBooks = async (req, res) => {
    const user_id = req.user._id
    const books = await Book.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(books)
}

// get a single book
const getBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such book'})
    }

    const book = await Book.findById(id)

    if (!book) {
        return res.status(404).json({error: 'No such book'})
    }

    res.status(200).json(book)
}

// Add new book
const addBook = async (req, res) => {
    const {title, author, cover, rating, notes, isPublic} = req.body

    try {
        const user_id = req.user._id
        const newBook = await Book.create({title: title, author: author, cover: cover, rating: rating, notes: notes, isPublic, user_id})
        
        res.status(200).json(newBook)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

// Delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such book'})
    }

    const book = await Book.findOneAndDelete({_id: id})

    if (!book) {
        return res.status(404).json({error: 'No such book'})
    }

    res.status(200).json(book)
}

// update a book
const updateBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such book'})
    }

    const book = await Book.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!book) {
        return res.status(404).json({error: 'No such book'})
    }

    const newBook = await Book.findById(id)

    res.status(200).json(newBook)
}

export {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook
}