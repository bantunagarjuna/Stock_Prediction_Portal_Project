import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Check for access token in localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // Initialize auth state on load
    useEffect(() => {
        const token = localStorage.getItem("access");
        setIsLoggedIn(!!token);
    }, []);
    
    // Logout function to centralize logout logic
    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
export { AuthContext };