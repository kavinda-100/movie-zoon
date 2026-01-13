export const TMDB_CONFIG = {
	BASE_URL: 'https://api.themoviedb.org/3',
	API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
	HEADERS: {
		accept: 'application/json',
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
	},
};

// const url =
// 	'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

/**
 * This function fetches a list of movies from TMDB API.
 * @returns List of all movies
 */
export async function fetchMovies() {
	const endPoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc'`;

	const response = await fetch(endPoint, {
		method: 'GET',
		headers: TMDB_CONFIG.HEADERS,
	});

	if (!response.ok) {
		console.log('Failed to fetch movies', {
			error: response.statusText,
			status: response.status,
		});
		throw new Error('Failed to fetch movies');
	}

	const data = await response.json();
	return data.results;
}

/**
 * This function searches for movies based on a query string.
 * @param query The search query string
 * @returns List of movies matching the search query
 */
export async function searchMovies({ query }: { query: string }) {
	const endPoint = `${TMDB_CONFIG.BASE_URL}/search/movie?include_adult=false&include_video=false&query=${encodeURIComponent(query)}`;

	const response = await fetch(endPoint, {
		method: 'GET',
		headers: TMDB_CONFIG.HEADERS,
	});

	if (!response.ok) {
		console.log('Failed to fetch movies', {
			error: response.statusText,
			status: response.status,
		});
		throw new Error('Failed to fetch movies');
	}

	const data = await response.json();
	return data.results;
}

/**
 * This function fetches detailed information about a specific movie by its ID.
 * @param movieId The ID of the movie to fetch details for
 * @returns Detailed information about the specified movie
 */
export async function fetchMovieDetails({
	movieId,
}: {
	movieId: number;
}): Promise<MovieDetails> {
	const endPoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;

	const response = await fetch(endPoint, {
		method: 'GET',
		headers: TMDB_CONFIG.HEADERS,
	});

	if (!response.ok) {
		console.log('Failed to fetch movie details', {
			error: response.statusText,
			status: response.status,
		});
		throw new Error('Failed to fetch movie details');
	}

	const data = await response.json();
	return data;
}
