import { useContext } from "react";
import { AuthContextExports } from "../context/AuthContext";

const { AuthContext } = AuthContextExports;


export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside a AuthContextProvider')
    }

    return context
}