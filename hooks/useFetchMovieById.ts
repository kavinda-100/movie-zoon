import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchMovieDetails } from '../services/tmdb';

export function useFetchMovieById() {
	const [movieId, setMovieId] = React.useState<number | null>(null);

	const {
		data: movieDetails,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ['movieDetails', movieId],
		queryFn: async () => {
			if (movieId === null) {
				throw new Error('Movie ID is null');
			}
			return fetchMovieDetails({ movieId });
		},
		enabled: movieId !== null,
	});

	return {
		movieDetails,
		isPending,
		isError,
		error,
		setMovieId,
	};
}
