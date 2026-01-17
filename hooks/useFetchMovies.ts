import { fetchMovies } from '@/services/tmdb';
import { useInfiniteQuery } from '@tanstack/react-query';

// previously used for non-paginated fetch
// export function useFetchMovies() {
// 	const { data, isPending, isError, error, refetch } = useQuery({
// 		queryKey: ['movies'],
// 		queryFn: async () => fetchMovies(),
// 	});

// 	return {
// 		movies: data as Movie[],
// 		isPending,
// 		isError,
// 		error,
// 		refetch,
// 	};
// }

// new paginated fetch using useInfiniteQuery
export function useFetchMovies() {
	const {
		data,
		isPending,
		isError,
		error,
		refetch,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ['movies'],
		queryFn: ({ pageParam }) => fetchMovies({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			// TMDB API returns page info, check if there are more pages
			if (lastPage.page < lastPage.total_pages) {
				return lastPageParam + 1;
			}
			return undefined;
		},
		getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
			if (firstPageParam > 1) {
				return firstPageParam - 1;
			}
			return undefined;
		},
	});

	return {
		movies: data
			? (data.pages.flatMap((page) => page.results) as Movie[])
			: [],
		isPending,
		isError,
		error,
		refetch,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	};
}
