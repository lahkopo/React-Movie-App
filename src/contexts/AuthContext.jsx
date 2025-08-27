import { createContext, useState, useContext, useEffect } from "react";
import { createRequestToken, createSession, deleteSession, getAccountDetails } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [sessionId, setSessionId] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const storedSessionId = localStorage.getItem('tmdb_session_id');
        if (storedSessionId) {
            setSessionId(storedSessionId);
        }
    }, []);

    useEffect(() => {
        const fetchAccount = async () => {
            if (sessionId) {
                try {
                    const accDetails = await getAccountDetails(sessionId);
                    setAccount(accDetails);
                } catch (error) {
                    console.error(error);
                    logout();
                }
            }
        };
        fetchAccount();
    }, [sessionId]);

    const login = async () => {
        console.log("1. Inside login function.");
        try {
            const requestToken = await createRequestToken();
            console.log("2. Got request token:", requestToken);

            if (!requestToken) {
                console.error("Failed to get a valid request token.");
                return;
            }

            const redirectUrl = `${window.location.protocol}//${window.location.host}/approved`;
            const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectUrl}`;
            
            console.log("3. Redirecting to:", authUrl);
            
            window.location.href = authUrl;
        } catch (error) {
            console.error("4. Login failed with an error:", error);
        }
    };
    
    const logout = async () => {
        if (sessionId) await deleteSession(sessionId);
        setSessionId(null);
        setAccount(null);
        localStorage.removeItem('tmdb_session_id');
    };
    
    const handleApproved = async (requestToken) => {
        const newSessionId = await createSession(requestToken);
        setSessionId(newSessionId);
        localStorage.setItem('tmdb_session_id', newSessionId);
    };

    const value = {
        sessionId,
        account,
        login,
        logout,
        handleApproved,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};