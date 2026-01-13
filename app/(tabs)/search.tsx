import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { useSearchMovies } from '@/hooks/useSearchMovies';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
	const [searchText, setSearchText] = React.useState('');

	// fetch movies
	const { movies, isPending, isError, error, setQuery, refetch } =
		useSearchMovies();

	// update query when searchText changes
	React.useEffect(() => {
		// debounce
		const timeout = setTimeout(async () => {
			if (searchText.trim()) {
				// await queryClient.invalidateQueries({ queryKey: ['movies'] });
				setQuery(searchText);
				await refetch();
			}
		}, 500);

		// cleanup
		return () => clearTimeout(timeout);
	}, [searchText, setQuery, refetch]);

	// if loading
	if (isPending) {
		return (
			<View className="items-center justify-center flex-1 bg-primary">
				<SafeAreaView className="flex-1">
					{/* header */}
					<View className="my-4 mt-10">
						<Header label="Search Movies" />
					</View>

					{/* SearchBar */}
					<View className="w-full my-4">
						<SearchBar
							onPress={() => {}}
							value={searchText}
							onChangeText={setSearchText}
						/>
					</View>

					<ActivityIndicator
						size="large"
						color="#fff"
						className="self-center mt-10"
					/>
				</SafeAreaView>
			</View>
		);
	}

	// if error
	if (isError) {
		return (
			<View className="items-center justify-center flex-1 px-5 bg-primary">
				<SafeAreaView className="flex-1">
					{/* header */}
					<View className="my-4 mt-10">
						<Header label="Search Movies" />
					</View>

					{/* SearchBar */}
					<View className="w-full my-4">
						<SearchBar
							onPress={() => {}}
							value={searchText}
							onChangeText={setSearchText}
						/>
					</View>

					<View className="mt-10">
						<Text className="text-center text-white">
							{error?.message ??
								'Something went wrong while fetching movies.'}
						</Text>
					</View>
				</SafeAreaView>
			</View>
		);
	}

	// main return
	return (
		<View className="flex-1 px-3 bg-primary">
			<SafeAreaView className="flex-1">
				{/* content */}
				{/* header */}
				<View className="my-4 mt-10">
					<Header label="Search Movies" />
				</View>

				{/* SearchBar */}
				<View className="w-full my-4">
					<SearchBar
						onPress={() => {}}
						value={searchText}
						onChangeText={setSearchText}
					/>
				</View>

				{/* movies list */}
				<View className="my-4">
					{/* header */}
					<Text className="mb-4 text-lg font-semibold text-white">
						{!isPending &&
						!isError &&
						searchText.trim() &&
						movies.length > 0
							? `Search Results for "${searchText}"`
							: 'Search Movies'}
					</Text>

					{/* list */}
					<FlatList
						data={movies}
						renderItem={({ item }) => <MovieCard movie={item} />}
						keyExtractor={(item) => item.id.toString()}
						columnWrapperStyle={{
							justifyContent: 'flex-start',
							gap: 20,
							marginBottom: 15,
						}}
						className="mt-2 mb-150"
						numColumns={3}
						ListEmptyComponent={
							!isPending && !isError ? (
								<View className="px-5 mt-5">
									<Text className="text-center text-white">
										{searchText.trim()
											? 'No results found.'
											: 'Start typing to search for movies.'}
									</Text>
								</View>
							) : null
						}
					/>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default SearchScreen;
