import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/Browse.css";

interface OlBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
}

const randomQuery = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters[Math.floor(Math.random() * letters.length)];
};

const Browse = () => {
  const [books, setBooks] = useState<OlBook[]>([]);
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

    const fetchBooks = useCallback(async () => {
        try {
            const query = searchTerm || randomQuery(); 
            const res = await axios.get("https://openlibrary.org/search.json", {
            params: { q: query, page, limit: 21 },
            });

            if (page === 1) {
            setBooks(res.data.docs);
            } else {
            setBooks(prev => [...prev, ...res.data.docs]);
            }
        } catch (err) {
            console.error(err);
        }
    }, [page, searchTerm]);


  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);


  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setPage(prev => prev + 1);
    }, { root: null, rootMargin: "200px", threshold: 0.1 });

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.author_name?.[0]?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="browse-container">
      <h2>Browse Books</h2>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {searchTerm && (
        <button onClick={() => setSearchTerm("")} className="clear-btn">
            Clear
        </button>
      )}


      <div className="book-grid">
        {filteredBooks.map((b, i) => (
          <motion.div
            key={`${b.key}-${i}`}
            className="book-card"
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            {b.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg`}
                alt={b.title}
              />
            ) : (
              <div className="no-cover">No Image</div>
            )}
            <div className="card-content">
              <h3>{b.title}</h3>
              <p>{b.author_name?.[0] || "Unknown Author"}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div ref={loader} className="spinner"></div>
    </div>
  );
};

export default Browse;
