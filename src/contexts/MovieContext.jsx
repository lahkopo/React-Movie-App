import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import { getFavoriteMovies, markAsFavorite } from "../services/api.js";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { account, sessionId } = useAuth();

    useEffect(() => {
        const fetchFavorites = async () => {
            if (account && sessionId) {
                try {
                    const favMovies = await getFavoriteMovies(account.id, sessionId);
                    setFavorites(favMovies);
                } catch (error) {
                    console.error("Could not fetch favorites:", error);
                }
            } else {
                setFavorites([]);
            }
        };

        fetchFavorites();
    }, [account, sessionId]);

    const addToFavorites = async (movie) => {
        if (!account) return;

        setFavorites(prev => [...prev, movie]);
        
        try {
            await markAsFavorite({
                accountId: account.id,
                sessionId,
                movieId: movie.id,
                isFavorite: true,
            });
        } catch (error) {
            console.error("Failed to add favorite:", error);
            setFavorites(prev => prev.filter(m => m.id !== movie.id));
        }
    };

    const removeFromFavorites = async (movieId) => {
        if (!account) return;

        setFavorites(prev => prev.filter(movie => movie.id !== movieId));

        try {
            await markAsFavorite({
                accountId: account.id,
                sessionId,
                movieId: movieId,
                isFavorite: false,
            });
        } catch (error) {
            console.error("Failed to remove favorite:", error);
        }
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};