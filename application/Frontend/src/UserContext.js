import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
    user: null,
    login: async (credentials) => {
    },
    logout: () => {
    }
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Attempt to hydrate user from localStorage
        const stored = localStorage.getItem('user');
        const expiry = localStorage.getItem('sessionExpiry');
        const now = Date.now();

        if (stored && expiry && now < parseInt(expiry, 10)) {
            setUser(JSON.parse(stored));
        } else {
            // Clear expired or absent session
            localStorage.removeItem('user');
            localStorage.removeItem('sessionExpiry');

        }
    }, []);

    const login = (userData) => {
        const sessionStart = Date.now();
        const sessionDuration = 30 * 60 * 1000; // 30 mins
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('sessionExpiry', (sessionStart + sessionDuration).toString());
        setUser(userData);
    };

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
