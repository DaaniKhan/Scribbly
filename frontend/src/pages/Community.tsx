import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Community.css";
import { motion } from "framer-motion";
import { useAuthContext } from "../hooks/useAuthContext";
import { formatDistanceToNow } from "date-fns";

interface Book {
  _id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  notes?: string;
  createdAt: string;
  isPublic: boolean;
  user_id: {
    _id: Object;
    email: string;
  };
}

const Community = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filtered, setFiltered] = useState<Book[]>([]);
  const [query, setQuery] = useState("");

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPublicBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/books/public", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBooks(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch public books", err);
      }
    };

    fetchPublicBooks();
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      )
    );
  }, [query, books]);

  return (
    <div className="community-container">
      <h2>Community Reviews</h2>
      <input
        type="text"
        placeholder="Search by title or author..."
        className="search-bar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="review-list">
        {filtered.map((book, index) => (
          <motion.div
            className="review-card"
            key={book._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="card-left">
                <img
                src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
                alt={book.title}
                />
            </div>

            <div className="card-right">
                <div className="card-header">
                    <h3 className="card-title">{book.title}</h3>
                    <p className="card-email">{book.user_id.email}</p>
                </div>
                <p className="card-author">by {book.author}</p>
                <div className="card-rating">
                {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={star <= book.rating ? "filled" : ""}>★</span>
                ))}
                </div>

                <p className="card-notes">{book.notes || "No notes provided."}</p>

                <p className="card-footer">{formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}</p>
            </div>
            </motion.div>

        ))}
      </div>
    </div>
  );
};

export default Community;
