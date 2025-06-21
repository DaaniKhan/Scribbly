import express from "express"
import { 
    getBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook
} from "../controllers/bookController.js"

import requireAuth from "../middleware/requireAuth.js"

const router = express.Router()

router.use(requireAuth)

// GET all books
router.get('/', getBooks)

// GET single book
router.get("/:id", getBook)

// POST a new book
router.post("/", addBook)

// DELETE a book
router.delete("/:id", deleteBook)

// UPDATE a book
router.patch("/:id", updateBook)

export default router