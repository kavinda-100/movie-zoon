import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { useFetchMovies } from '@/hooks/useFetchMovies';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
	// router
	const router = useRouter();

	// fetch movies
	const { movies, isPending, isError, error } = useFetchMovies();

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
				<View className="my-4">
					{/* header */}
					<Text className="mb-4 text-lg font-semibold text-white">
						Latest Movies
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
					/>
				</View>
			</SafeAreaView>
		</View>
	);
}
