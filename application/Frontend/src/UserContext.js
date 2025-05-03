import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user + validate session on app start
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const expiry = localStorage.getItem('sessionExpiry');

        if (storedUser && expiry) {
            const now = Date.now();
            if (now < parseInt(expiry, 10)) {
                setUser(JSON.parse(storedUser));
            } else {
                localStorage.clear(); // expired
                setUser(null);
            }
        }
    }, []);

    // Log user in
    const login = (userData) => {
        const sessionStart = Date.now();
        const sessionDuration = 30 * 60 * 1000; // 30 minutes
        localStorage.setItem('user', JSON.stringify(userData)); // Store the full object
        localStorage.setItem('sessionExpiry', (sessionStart + sessionDuration).toString());


        setUser(userData);
    };

    // Log user out
    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
