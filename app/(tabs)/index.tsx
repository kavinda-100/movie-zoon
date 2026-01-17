import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import RecentSearch from '@/components/RecentSearch';
import SearchBar from '@/components/SearchBar';
import { useFetchMovies } from '@/hooks/useFetchMovies';
import { useGetRecentSearchMovies } from '@/hooks/useGetRecentSearchMovies';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
	// db context
	const db = useSQLiteContext();
	// router
	const router = useRouter();

	// refresh state
	const [refreshing, setRefreshing] = React.useState(false);

	// fetch movies
	const {
		movies,
		isPending,
		isError,
		error,
		refetch: refetchMovies,
	} = useFetchMovies();

	// fetch recent search movies
	const {
		getRecentSearchMovies,
		recentSearchMovies,
		isPending: isRecentSearchPending,
		error: recentSearchError,
	} = useGetRecentSearchMovies(db);

	// console.log('Recent Search Movies:', recentSearchMovies);

	// fetch recent search movies on mount
	React.useEffect(() => {
		getRecentSearchMovies();
	}, [getRecentSearchMovies]);

	// handle refresh
	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		try {
			await Promise.all([refetchMovies(), getRecentSearchMovies()]);
		} catch (error) {
			console.error('Error refreshing:', error);
		} finally {
			setRefreshing(false);
		}
	}, [refetchMovies, getRecentSearchMovies]);

	// if loading
	if (isPending) {
		return (
			<View className="items-center justify-center flex-1 bg-primary">
				<SafeAreaView className="flex-1">
					{/* header */}
					<View className="my-4 mt-10">
						<Header label="Movie Zoon" />
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
						<Header label="Movie Zoon" />
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

	// Render header content
	const renderListHeader = () => (
		<>
			{/* recent search movies list */}
			{isRecentSearchPending ? (
				<View className="items-center justify-center w-full mt-2">
					<ActivityIndicator
						size="small"
						color="#fff"
						className="self-center mt-2"
					/>
				</View>
			) : recentSearchError ? (
				<View className="items-center justify-center w-full mt-2">
					<Text className="text-center text-white">
						{recentSearchError ??
							'Error fetching recent search movies.'}
					</Text>
				</View>
			) : recentSearchMovies.length > 0 ? (
				<View className="my-4">
					<RecentSearch recentSearchMovies={recentSearchMovies} />
				</View>
			) : null}

			{/* movies list header */}
			<View className="my-4">
				<Text className="mb-4 text-lg font-semibold text-white">
					Latest Movies
				</Text>
			</View>
		</>
	);

	// main return
	return (
		<View className="flex-1 px-3 bg-primary">
			<SafeAreaView className="flex-1">
				{/* content */}
				{/* header */}
				<View className="my-4 mt-10">
					<Header label="Movie Zoon" />
				</View>

				{/* SearchBar */}
				<View className="my-4">
					<SearchBar onPress={() => router.push('/search')} />
				</View>

				{/* movies list */}
				<FlatList
					data={movies}
					renderItem={({ item }) => <MovieCard movie={item} />}
					keyExtractor={(item) => item.id.toString()}
					ListHeaderComponent={renderListHeader}
					columnWrapperStyle={{
						justifyContent: 'flex-start',
						gap: 20,
						marginBottom: 15,
					}}
					contentContainerStyle={{
						paddingBottom: 20,
					}}
					numColumns={3}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor="#fff"
							colors={['#fff']}
						/>
					}
				/>
			</SafeAreaView>
		</View>
	);
}
