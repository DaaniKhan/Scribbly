import { createContext, useReducer, useEffect, type ReactNode, type Dispatch } from 'react'

// Types
interface AuthState {
  user: any | null  
}

type AuthAction =
  | { type: 'LOGIN'; payload: any } 
  | { type: 'LOGOUT' }

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>
}

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

interface AuthProviderProps {
  children: ReactNode
}

// Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  useEffect(() => {
    const userString = localStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : null

    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])

  console.log('AuthContext State:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
