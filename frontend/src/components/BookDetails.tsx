import "../styles/BookDetails.css"
import axios from "axios"
import { useBooksContext } from "../hooks/useBooksContext"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { BASE_URL } from "./BaseURL"

interface Book {
  _id: string
  title: string
  author: string
  cover: string
  rating: number
  notes?: string
  createdAt: string
  isPublic: Boolean
}

interface BookDetailsProps {
  book: Book
}

const BookDetails = ({ book }: BookDetailsProps) => {
  const { dispatch } = useBooksContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editedNotes, setEditedNotes] = useState(book.notes || "")
  const [editedRating, setEditedRating] = useState(book.rating)
  const [notesCharLimit] = useState(500)
  const [editedIsPublic, setEditedIsPublic] = useState(book.isPublic);

  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }
    
    const response = await axios.delete(`${BASE_URL}/api/books/` + book._id, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })

    if (response.data) {
      dispatch({ type: 'DELETE_BOOK', payload: response.data })
    }
  }

  const handleSave = async () => {
    if (!user) {
      return
    }

    const updated = { ...book, notes: editedNotes, rating: editedRating, isPublic: editedIsPublic }

    const response = await axios.patch(`${BASE_URL}/api/books/` + book._id, updated, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })

    if (response.data) {
      dispatch({ type: 'UPDATE_BOOK', payload: response.data })
      setIsEditing(false)
    }
  }

  const handleCancel = async () => {
    setEditedNotes(book.notes || "")
    setIsEditing(false)
  }


  return (
    <div className={`book-details ${isEditing ? "editing" : ""}`}>
      <div className="book-left">
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
          alt={book.title}
          className="book-cover"
        />

        <div className="rating-display">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={(isEditing ? editedRating : book.rating) >= star ? "#ffc107" : "none"}
              stroke="#ffc107"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() => isEditing && setEditedRating(star)}
              className={isEditing ? "clickable-star" : ""}
            >
              <polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.8 5.5 21 7 14 2 9.3 9 8.5 12 2" />
            </svg>
          ))}
        </div>
      </div>


      <div className="book-right">
        <div>
          <h4 className="book-title">{book.title}</h4>
          <p className="book-author">{book.author}</p>

          <div className="visibility-indicator">
            {!isEditing && (
              <div className="tooltip-wrapper">
                <span className="material-symbols-rounded visibility-icon">
                  {isEditing ? (editedIsPublic ? "public" : "lock") : (book.isPublic ? "public" : "lock")}
                </span>
                <span className="custom-tooltip">
                  {isEditing ? (editedIsPublic ? "Public" : "Private") : (book.isPublic ? "Public" : "Private")}
                </span>
              </div>
            )}

            {isEditing && (
              <div className="toggle-row">
                  <div className="tooltip-wrapper">
                    <span className="material-symbols-rounded visibility-icon">
                      {editedIsPublic ? "public" : "lock"}
                    </span>
                    <span className="custom-tooltip">
                      {editedIsPublic ? "Public" : "Private"}
                    </span>
                  </div>
                  <div
                    className={`toggle-switch ${editedIsPublic ? "on" : ""}`}
                    onClick={() => setEditedIsPublic(!editedIsPublic)}
                  >
                    <div className="toggle-thumb" />
                  </div>
              </div>
            )}
          </div>
                    
          {isEditing ? (
            <>
            <textarea
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
              className="edit-notes-area"
              maxLength={notesCharLimit}
            />
            <p className="char-count">{editedNotes.length}/{notesCharLimit} characters</p>
            </>
          ) : (
            <div className="book-notes-wrapper">
              <p className="book-notes">{book.notes ? `${book.notes}` : ""}</p>
            </div>
          )}
        </div>
        
        <div className="card-footer">
          <div className="button-group">
            {isEditing ? (
              <>
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined edit-button" onClick={() => setIsEditing(true)}>
                  edit
                </span>
                <span className="material-symbols-outlined delete-button" onClick={handleClick}>
                  delete
                </span>
              </>
            )}
          </div>
          <p className="timestamp">{formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}</p>
        </div>
      </div>
    </div>
  )

}

export default BookDetails
