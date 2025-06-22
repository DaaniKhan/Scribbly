import Book from "../models/bookModel.js"
import mongoose from "mongoose"
import leoProfanity from 'leo-profanity';

// get all public books
const getPublicBooks = async (req, res) => {
  const books = await Book.find({ isPublic: true })
    .sort({ createdAt: -1 })
    .populate("user_id", "email");

  res.status(200).json(books);
};

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

        const cleanNotes = notes ? leoProfanity.clean(notes) : '';

        // Check if the user has already reviewed the same book (based on cover or title+author)
        const existing = await Book.findOne({ user_id, title });

        if (existing) {
            return res.status(400).json({ error: "You've already reviewed this book." });
        }

        const newBook = await Book.create({title: title, author: author, cover: cover, rating: rating, notes: cleanNotes, isPublic, user_id})
        
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
    updateBook,
    getPublicBooks
}