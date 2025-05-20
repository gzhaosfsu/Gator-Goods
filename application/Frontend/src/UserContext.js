import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
    user: null,
    login: (credentials) => {},
    logout: () => {},
    updateCourier: () => {}
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
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

    const updateCourier = (is_courier) => {
        const update = {...user, is_courier: is_courier};
        localStorage.setItem('user', JSON.stringify(update));
        setUser(update);
    };
    return loading ? (
        <UserContext.Provider value={{ user, login, logout, updateCourier }}>
            {children}
        </UserContext.Provider>
    ) : null;
};
