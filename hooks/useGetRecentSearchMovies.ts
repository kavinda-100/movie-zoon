import { type SQLiteDatabase } from 'expo-sqlite';
import React from 'react';

export function useGetRecentSearchMovies(db: SQLiteDatabase) {
	// const table_name = 'recent_search_movies';
	const [isPending, setIsPending] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const [recentSearchMovies, setRecentSearchMovies] = React.useState<
		RecentSearchMovie[]
	>([]);

	const getRecentSearchMovies = React.useCallback(async () => {
		setIsPending(true);
		setError(null);
		try {
			const movies = await db.getAllAsync<RecentSearchMovie>(
				`SELECT * FROM recent_search_movies ORDER BY count DESC`,
			);
			setRecentSearchMovies(movies);
		} catch (err) {
			console.error('Error fetching Recent Search Movies:', err);
			setError(
				err instanceof Error
					? err.message
					: 'Error fetching Recent Search Movies',
			);
		} finally {
			setIsPending(false);
		}
	}, [db]);

	return {
		getRecentSearchMovies,
		recentSearchMovies,
		isPending,
		error,
	};
}
