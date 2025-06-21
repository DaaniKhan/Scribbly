import { useAuthContext } from "./useAuthContext"
import { useBooksContext } from "./useBooksContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: booksDispatch } = useBooksContext()
    
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        booksDispatch({type: 'SET_BOOKS', payload: []})
    }

    return { logout }
}