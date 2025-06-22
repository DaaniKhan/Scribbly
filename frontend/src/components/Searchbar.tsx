import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/Searchbar.css"

interface Book {
  key: string
  title: string
  author_name?: string[]
  cover_i?: number
}

interface SearchBarProps {
  onBookSelect: (book: Book) => void
}

const SearchBar = ({ onBookSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        fetchResults(query)
      } else {
        setResults([])
      }
    }, 500) // debounce: wait 500ms after last keypress

    return () => clearTimeout(delayDebounce)
  }, [query])

  const fetchResults = async (searchTerm: string) => {
    setLoading(true)
    try {
      const response = await axios.get("https://openlibrary.org/search.json", {
        params: { q: searchTerm },
        headers: {
          "User-Agent": "Scribbly (daanishuddin@gmail.com)"
        }
      })
      setResults(response.data.docs.slice(0, 10))
    } catch (error) {
      console.error("Search failed", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (book: Book) => {
    onBookSelect(book)
    setQuery("")          
    setResults([])        
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for a book..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* {loading && <p>Loading...</p>} */}
      {loading && (
        <div className="loading-spinner">
          <span className="material-symbols-rounded">progress_activity</span>
        </div>
      )}



      <div className="results">
        {results.map((book) => (
          <div 
            key={book.key} 
            className="result"
            onClick={() => handleSelect(book)}
            style={{cursor: 'pointer'}}            
          >
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                alt={book.title}
              />
            ) : (
              <div className="placeholder">No image</div>
            )}
            <div>
              <strong>{book.title}</strong>
              <br />
              <em>{book.author_name?.[0]}</em>
            </div>
          </div>
        ))}
      </div>

      {!loading && query.length > 2 && results.length === 0 && (
        <p className="no-results">No results found.</p>
      )}

    </div>
  )
}

export default SearchBar
