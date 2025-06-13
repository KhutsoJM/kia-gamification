import { createContext, useState, useRef, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const logout = () => {
        console.log('User has logged out')
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// hook for easy access
// export const useAuth = () => useContext(AuthContext)