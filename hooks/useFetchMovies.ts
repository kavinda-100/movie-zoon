import { fetchMovies } from '@/services/tmdb';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export function useFetchMovies() {
	const [query, setQuery] = React.useState('');

	const { data, isPending, isError, error } = useQuery({
		queryKey: ['movies'],
		queryFn: async () => fetchMovies({ query: query }),
	});

	return {
		movies: data as Movie[],
		isPending,
		isError,
		error,
		setQuery,
	};
}
