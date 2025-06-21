import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BookContextExports } from "./context/BookContext";
import { AuthContextProvider } from './context/AuthContext.tsx';

const { BooksContextProvider } = BookContextExports;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <BooksContextProvider>
        <App />
      </BooksContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
