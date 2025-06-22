import { useState } from "react"
import SearchBar from "./Searchbar"
import axios from "axios"
import '../styles/BookForm.css'
import { useBooksContext } from "../hooks/useBooksContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { BASE_URL } from "./BaseURL"


const BookForm = () => {
  const { dispatch } = useBooksContext()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [cover, setCover] = useState('')
  const [notes, setNotes] = useState('')
  const [rating, setRating] = useState(0) 
  const [hoverRating, setHoverRating] = useState(0)
  const [bookSelected, setBookSelected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notesCharLimit] = useState(500)
  const [isPublic, setIsPublic] = useState(true)
  const [error, setError] = useState<String | null>(null)


  const { user } = useAuthContext()

  const handleBookSelect = (book: any) => {
    setError(null)
    setTitle(book.title)
    setAuthor(book.author_name?.[0] || '')
    setCover(book.cover_i ? book.cover_i.toString() : '')
    setBookSelected(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      return
    }

    setLoading(true)

    const newBook = {
      title,
      author,
      cover,
      rating,
      notes,
      isPublic
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/books`, newBook, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })

      setTitle('')
      setAuthor('')
      setCover('')
      setNotes('')
      setRating(0)
      setHoverRating(0)
      setBookSelected(false)
      setIsPublic(true)

      dispatch({type: 'CREATE_BOOK', payload: response.data})
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || "Something went wrong while adding the book.";
        
        setError(message);
        console.error('Axios error:', error.response?.status, error.response?.data)
      } else {
        setError("An unexpected error occured")
        console.error('Unexpected error:', error)
      }
    } finally {
      setError(null)
      setLoading(false)
    }
  }

  return (
    <div className="book-form">
      <SearchBar onBookSelect={handleBookSelect} />
      <form onSubmit={handleSubmit}>
        <div className="form-content">
          {/* Left Column */}
          <div className="form-left">
            {bookSelected && (
              <>
                <div className="toggle-row">
                  <div className="tooltip-wrapper">
                    <span className="material-symbols-rounded visibility-icon">
                      {isPublic ? "public" : "lock"}
                    </span>
                    <span className="custom-tooltip">
                      {isPublic ? "Public" : "Private"}
                    </span>
                  </div>
                  <div
                    className={`toggle-switch ${isPublic ? "on" : ""}`}
                    onClick={() => setIsPublic(!isPublic)}
                  >
                    <div className="toggle-thumb" />
                  </div>
                </div>
                
                <div className="book-meta">
                  <h3 className="book-title">{title}</h3>
                  <p className="book-author">by {author}</p>
                  
                </div>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Your thoughts/notes"
                  className="notes-box"
                  maxLength={notesCharLimit}
                />

                <p className="char-count">{notes.length}/{notesCharLimit} characters</p>

                <div className="form-buttons">
                  <button className="add-button" type="submit" disabled={loading}>
                    {loading ? (
                      <span className="material-symbols-rounded spinner">progress_activity</span>
                    ) : (
                      "Add Book to Library"
                    )}
                  </button>

                  <button
                    type="button"
                    className="clear-btn"
                    onClick={() => {
                      setTitle('')
                      setAuthor('')
                      setCover('')
                      setNotes('')
                      setRating(0)
                      setHoverRating(0)
                      setBookSelected(false)
                    }}
                  >
                    Clear
                  </button>

                  {error && <div className="signup-error">{error}</div>}
                </div>
              </>
            )}
          </div>

          {/* Right Column */}
          <div className="form-right">
            {bookSelected && (
              <>
                
                
                {cover && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`}
                    alt={title}
                    className="book-cover-preview"
                  />
                )}

                <div className="rating-display">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = hoverRating >= star || (!hoverRating && rating >= star)

                    return (
                      <div
                        key={star}
                        className="star"
                        onMouseMove={(e) => {
                          const { left, width } = e.currentTarget.getBoundingClientRect()
                          const x = e.clientX - left
                          const percent = x / width
                          const half = percent < 0.5
                          setHoverRating(star - (half ? 0.5 : 0))
                        }}
                        onClick={() => setRating(hoverRating)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <svg
                          className="star-svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill={isFilled ? "#ffc107" : "none"}
                          stroke="#ffc107"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.8 5.5 21 7 14 2 9.3 9 8.5 12 2" />
                        </svg>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </form>
          
    </div>
  )
}

export default BookForm