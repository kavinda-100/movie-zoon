import { useFetchMovieById } from '@/hooks/useFetchMovieById';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

const MovieDetailScreen = () => {
	// movie id from route params
	const { id } = useLocalSearchParams();
	// get movie details using the id
	const { movieDetails, setMovieId, isPending, isError, error } =
		useFetchMovieById();

	React.useEffect(() => {
		// if id is not present, do nothing
		if (!id) return;

		// set the movie id to fetch details
		const movieId = Number(id);
		setMovieId(movieId);
	}, [id, setMovieId]);

	// render loading state
	if (isPending) {
		return (
			<View className="items-center justify-center flex-1 bg-primary">
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}

	// render error state
	if (isError) {
		return (
			<View className="items-center justify-center flex-1 px-4 bg-primary">
				<Text className="text-lg text-white">
					Error: {error?.message ?? 'Error fetching movie details'}
				</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-primary">
			<ScrollView
				contentContainerStyle={{
					paddingBottom: 80,
					paddingHorizontal: 16,
				}}
			>
				<View className="flex-1 w-full">
					{/* Show the banner */}
					<Image
						source={{
							uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
						}}
						className="w-full h-[550px]"
						resizeMode="stretch"
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default MovieDetailScreen;
