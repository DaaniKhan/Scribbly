import { createContext, useReducer, type ReactNode, type Dispatch } from 'react'

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

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

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

// Provider
const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  console.log('AuthContext State:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthContextExports = {
  AuthContext,
  AuthContextProvider,
};