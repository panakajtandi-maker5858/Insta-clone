// THIS IS THE PART OF STATE LAYER , WHICH MANAGES ALL THE STATES OF UI .
// For understanding :- Its si a strorage which stores data like userdata , etc 

import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}