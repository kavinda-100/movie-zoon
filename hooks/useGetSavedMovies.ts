import { type SQLiteDatabase } from 'expo-sqlite';
import React from 'react';

export function useGetSavedMovies(db: SQLiteDatabase) {
	const [savedMovies, setSavedMovies] = React.useState<SaveMovie[]>([]);
	const [isPending, setIsPending] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	const getSavedMovies = React.useCallback(async () => {
		setIsPending(true);
		setError(null);
		try {
			const movies = await db.getAllAsync<SaveMovie>(
				`SELECT * FROM saved_movies`,
			);
			setSavedMovies(movies);
		} catch (err) {
			console.error('Error fetching saved movies:', err);
			setError('Failed to fetch saved movies.');
		} finally {
			setIsPending(false);
		}
	}, [db]);

	return {
		savedMovies,
		isPending,
		error,
		getSavedMovies,
	};
}
