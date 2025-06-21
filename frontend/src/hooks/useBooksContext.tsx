import { useContext } from "react";
import { BookContextExports } from "../context/BookContext";

const { BooksContext } = BookContextExports;


export const useBooksContext = () => {
    const context = useContext(BooksContext)

    if (!context) {
        throw Error('useBooksContext must be used inside a BooksContextProvider')
    }

    return context
}