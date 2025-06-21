import { useEffect, useState } from "react"
import axios from 'axios'
import BookDetails from "../components/BookDetails"
import BookForm from "../components/BookForm"
import { useBooksContext } from "../hooks/useBooksContext"
import '../styles/Home.css'

interface Book {
    _id: string
    title: string
    author: string
    cover: string
    rating: number
    notes?: string
    createdAt: string
}

const Home = () => {
    const {books, dispatch} = useBooksContext()
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get< Book[] >('http://localhost:3000/api/books')
            
            dispatch({type: 'SET_BOOKS', payload: response.data})
        }

        fetchBooks()
    }, [dispatch])

    return (
        <div className="home">

            <section className="book-form-section">
                <h2>
                    <button
                        className="toggle-book-form-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <span className="material-symbols-rounded">
                            {showForm ? "remove" : "add"}
                        </span>
                        {showForm ? "Cancel" : "Add Book"}
                    </button>
                </h2>

                {showForm && 
                <>
                    <h2>Add a New Book</h2>
                    <BookForm />
                </>
                }
            </section>

            <section className="book-list-section">
                <h2>Your Library</h2>
                <div className="book-grid">
                    {books?.map((book) => (
                        <BookDetails key={book._id} book={book} />
                    ))}
                </div>
            </section>
        </div>
    )

}

export default Home