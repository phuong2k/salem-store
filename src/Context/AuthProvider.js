import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [showLogin, setShowLogin] = useState(true);
    const [user, setUser] = useState({});
    const history = useNavigate();

    React.useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL,
                });

                setShowLogin(false);
                return;
            }
            setUser({});
            setShowLogin(true);
        });
        return () => {
            unsubscribed();
        };
    }, [history]);

    return <AuthContext.Provider value={{ user, showLogin, setShowLogin }}>{children}</AuthContext.Provider>;
}
