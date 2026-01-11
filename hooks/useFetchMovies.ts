import { fetchMovies } from '@/services/tmdb';
import { useQuery } from '@tanstack/react-query';

export function useFetchMovies() {
	const { data, isPending, isError, error, refetch } = useQuery({
		queryKey: ['movies'],
		queryFn: async () => fetchMovies(),
	});

	return {
		movies: data as Movie[],
		isPending,
		isError,
		error,
		refetch,
	};
}
