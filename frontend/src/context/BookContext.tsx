import { createContext, useReducer, type ReactNode, type Dispatch } from "react";

// Types
export interface Book {
  _id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  notes?: string;
  createdAt: string;
}

type State = {
  books: Book[] | null;
};

type Action =
  | { type: "SET_BOOKS"; payload: Book[] }
  | { type: "CREATE_BOOK"; payload: Book }
  | { type: "DELETE_BOOK"; payload: Book }
  | { type: "UPDATE_BOOK"; payload: Book }

type BooksContextType = State & {
  dispatch: Dispatch<Action>;
};

// Reducer
const booksReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_BOOKS":
      return { 
        books: action.payload 
      };
    case "CREATE_BOOK":
      return { 
        books: [action.payload, ...(state.books || [])] 
      };
    case "DELETE_BOOK":
      return { 
        books: state.books ? state.books.filter((b) => b._id !== action.payload._id) : []
      };
    case "UPDATE_BOOK":
      return {
        books: state.books
          ? state.books.map((book) =>
              book._id === action.payload._id ? action.payload : book
            )
          : []
      };
    default:
      return state;
  }
}

// Context
const BooksContext = createContext<BooksContextType | undefined>(undefined);

// Provider
const BooksContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(booksReducer, { books: null });

  return (
    <BooksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
}

export const BookContextExports = {
  BooksContext,
  BooksContextProvider,
};