const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  const data = await response.json();
  return { results: data.results, total_pages: data.total_pages };
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to search movies");
  }
  const data = await response.json();
  return { results: data.results, total_pages: data.total_pages };
};

export const getMovieCredits = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch credits");
  }
  const data = await response.json();

  const director = data.crew.find((person) => person.job === "Director");
  const cast = data.cast.slice(0, 4);

  return {
    director: director ? director.name : "N/A",
    cast: cast,
  };
};

export const createRequestToken = async () => {
  const response = await fetch(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to create request token");
  const data = await response.json();
  return data.request_token;
};

export const createSession = async (requestToken) => {
  const response = await fetch(`${BASE_URL}/authentication/session/new?api_key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ request_token: requestToken }),
  });
  if (!response.ok) throw new Error("Failed to create session");
  const data = await response.json();
  return data.session_id;
};

export const deleteSession = async (sessionId) => {
    const response = await fetch(`${BASE_URL}/authentication/session?api_key=${API_KEY}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
    });
    if (!response.ok) throw new Error("Failed to delete session");
    const data = await response.json();
    return data.success;
};

export const getAccountDetails = async (sessionId) => {
  const response = await fetch(
    `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`
  );
  if (!response.ok) throw new Error("Failed to get account details");
  return await response.json();
};

export const getFavoriteMovies = async (accountId, sessionId) => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
  );
  if (!response.ok) throw new Error("Failed to get favorite movies");
  const data = await response.json();
  return data.results;
};

export const markAsFavorite = async ({ accountId, sessionId, movieId, isFavorite }) => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        favorite: isFavorite,
      }),
    }
  );
  if (!response.ok) throw new Error("Failed to mark as favorite");
  return await response.json();
};

export const getMovieVideos = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch videos");
  const data = await response.json();

  const trailer = data.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  return trailer ? trailer.key : null;
};