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

export async function fetchMovies({ query }: { query: string }) {
	const endPoint = query
		? `${TMDB_CONFIG.BASE_URL}/search/movie?include_adult=false&include_video=false&query=${encodeURIComponent(query)}`
		: `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc'`;

	const response = await fetch(endPoint, {
		method: 'GET',
		headers: TMDB_CONFIG.HEADERS,
	});

	if (!response.ok) {
		throw new Error('Failed to fetch movies');
	}

	const data = await response.json();
	return data.results;
}
