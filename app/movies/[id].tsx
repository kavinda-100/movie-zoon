import { useFetchMovieById } from '@/hooks/useFetchMovieById';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
	ActivityIndicator,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

// format runtime in minutes
function formatRuntime(runtime: number) {
	return Intl.NumberFormat('en-US', {
		style: 'unit',
		unit: 'minute',
		unitDisplay: 'short',
	}).format(runtime);
}

//format currency
function formatCurrency(amount: number) {
	return Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
}

const MovieDetailScreen = () => {
	// router
	const router = useRouter();
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

				{/* Movie Details */}
				<View className="flex-col items-start justify-center px-5 mt-5">
					{/* Title */}
					<Text className="text-xl font-bold text-white">
						{movieDetails?.title}
					</Text>

					{/* date and runtime */}
					<View className="flex-row items-center mt-2 gap-x-1">
						{/* date */}
						<Text className="text-sm text-light-200">
							{movieDetails?.release_date}
						</Text>
						{/* runtime */}
						<Text className="text-sm text-light-200">
							• {formatRuntime(movieDetails?.runtime!)} m
						</Text>
					</View>

					{/* icons, vote average, and vote count */}
					<View className="flex-row items-center px-2 py-1 mt-2 rounded-md bg-dark-100 gap-x-2">
						{/* icons */}
						<Ionicons name="star" size={10} color="#FFD700" />
						{/* vote average */}
						<Text className="text-sm font-bold text-white">
							{Math.round(movieDetails?.vote_average! / 2)}/ 10
						</Text>
						{/* vote count */}
						<Text className="text-sm font-bold text-white">
							({movieDetails?.vote_count} votes)
						</Text>
					</View>

					{/* overview */}
					<ShowMovieInfo
						label="Overview"
						value={movieDetails?.overview}
					/>

					{/* Genres */}
					<ShowMovieInfo
						label="Genres"
						value={
							movieDetails?.genres
								.map((genre) => genre.name)
								.join(' - ') ?? 'N/A'
						}
					/>

					{/* Budget and Revenue */}
					<View className="flex flex-row justify-between w-full">
						{/* Budget */}
						<ShowMovieInfo
							label="Budget"
							value={
								movieDetails?.budget
									? formatCurrency(movieDetails.budget)
									: 'N/A'
							}
						/>

						{/* Revenue */}
						<ShowMovieInfo
							label="Revenue"
							value={
								movieDetails?.revenue
									? formatCurrency(movieDetails.revenue)
									: 'N/A'
							}
						/>
					</View>

					{/* production companies */}
					<ShowMovieInfo
						label="Production Companies"
						value={
							movieDetails?.production_companies
								.map((company) => company.name)
								.join(' - ') ?? 'N/A'
						}
					/>
				</View>

				{/* Go Back Button */}
				<TouchableOpacity onPress={router.back} className="mx-5">
					<View className="flex flex-row items-center justify-center py-3.5 mt-5 mb-5 bg-accent rounded-lg">
						<Ionicons
							name="arrow-back"
							size={15}
							color="#fff"
							className="mr-2"
						/>
						<Text className="text-base font-semibold text-white">
							Go Back
						</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default MovieDetailScreen;

type ShowMovieInfoProps = {
	label: string;
	value?: string | number | null;
};
const ShowMovieInfo = ({ label, value }: ShowMovieInfoProps) => {
	return (
		<View className="flex-col mt-5">
			<Text className="text-sm font-normal text-light-200">{label}</Text>
			<Text className="mt-2 text-sm font-bold text-light-100">
				{value ?? 'N/A'}
			</Text>
		</View>
	);
};
