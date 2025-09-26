const API_KEY = process.env.EXPO_APP_MOVIE_API_KEY;

export const TMDB_CONFIG = {
  API_KEY: API_KEY,
  BASE_URL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : "/discover/movie?sort_by=popularity.desc";

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // console.log("Response not ok:", response);
    throw new Error("Failed to fetch movies", { cause: response.statusText });
  }

  const data = await response.json();

  return data.results;
};
