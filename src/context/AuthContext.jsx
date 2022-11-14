import { useEffect, useState, createContext } from "react";
import { auth } from "../fireabse";
import { onAuthStateChanged } from "firebase/auth"
const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        const authF = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(user)
        })
        return () => authF()
    }, [])

    const value = {
        isAuthenticated
    }
    return <AuthContext.Provider value={value} >
        {children}
    </AuthContext.Provider>
}

export { AuthContext, AuthContextProvider }