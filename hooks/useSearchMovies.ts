import { searchMovies } from '@/services/tmdb';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export function useSearchMovies() {
	const [query, setQuery] = React.useState('');

	const { data, isPending, isError, error, refetch } = useQuery({
		queryKey: ['movies', query],
		queryFn: async () => searchMovies({ query: query }),
	});

	return {
		movies: data as Movie[],
		isPending,
		isError,
		error,
		refetch,
		setQuery,
	};
}
