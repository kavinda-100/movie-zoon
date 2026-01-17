import { useFetchMovieById } from '@/hooks/useFetchMovieById';
import { formatCurrency, formatRuntime } from '@/lib';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import React from 'react';
import {
	ActivityIndicator,
	Alert,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

// save recent search movie to the database
const saveRecentSearchMovies = async (
	db: SQLiteDatabase,
	movie: RecentSearchMovie,
) => {
	// const table_name = 'recent_search_movies';
	try {
		// check if the movie already exists
		const existsMovie = await db.getFirstAsync<RecentSearchMovie>(
			`SELECT * FROM recent_search_movies WHERE movie_id = ?`,
			[movie.movie_id],
		);
		// if exists, update the count
		if (existsMovie) {
			await db.runAsync(
				`UPDATE recent_search_movies SET count = ? WHERE movie_id = ?`,
				[existsMovie.count + 1, movie.movie_id],
			);
			console.log('Updated existing movie in recent searches.');
			return;
		}
		// if not exists, insert the new movie
		await db.runAsync(
			`INSERT INTO recent_search_movies (searchTerm, movie_id, title, count, poster_url) VALUES (?, ?, ?, ?, ?)`,
			[
				movie.searchTerm,
				movie.movie_id,
				movie.title,
				movie.count,
				movie.poster_url,
			],
		);
		console.log('Inserted new movie into recent searches.');
	} catch (error) {
		console.error('Error saving recent search movie:', error);
	}
};

// save movie functionality
const saveMovieToDB = async (
	db: SQLiteDatabase,
	movie: SaveMovie,
	setIsSaved: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	// const table_name = 'saved_movies';
	try {
		// check if the movie already exists
		const existsMovie = await db.getFirstAsync<SaveMovie>(
			`SELECT * FROM saved_movies WHERE movie_id = ?`,
			[movie.movie_id],
		);
		// if exists, remove it (unsave)
		if (existsMovie) {
			await db.runAsync(`DELETE FROM saved_movies WHERE movie_id = ?`, [
				movie.movie_id,
			]);
			console.log('Removed movie from saved movies.');
			Alert.alert(`${movie.title} removed from your movies.`);
			setIsSaved(false);
			return;
		}
		// if not exists, insert the new movie
		await db.runAsync(
			`INSERT INTO saved_movies (movie_id, title, poster_url) VALUES (?, ?, ?)`,
			[movie.movie_id, movie.title, movie.poster_url],
		);
		console.log('Saved movie to saved movies.');
		Alert.alert(`${movie.title} saved to your movies.`);
		setIsSaved(true);
	} catch (error) {
		console.error('Error saving movie:', error);
		Alert.alert('Error saving movie. Please try again.');
	}
};

// movie detail screen component
const MovieDetailScreen = () => {
	// db context
	const db = useSQLiteContext();
	// router
	const router = useRouter();
	// movie id from route params
	const { id } = useLocalSearchParams();
	// get movie details using the id
	const { movieDetails, setMovieId, isPending, isError, error } =
		useFetchMovieById();

	// state for save the movie
	const [isSaved, setIsSaved] = React.useState(false);

	// when id changes, set the movie id to fetch details
	React.useEffect(() => {
		// if id is not present, do nothing
		if (!id) return;

		// set the movie id to fetch details
		const movieId = Number(id);
		setMovieId(movieId);
	}, [id, setMovieId]);

	// when movieDetails changes, save to recent search movies
	React.useEffect(() => {
		// if movieDetails is not present, do nothing
		if (!movieDetails) return;

		// prepare the recent search movie object
		const recentSearchMovie: RecentSearchMovie = {
			searchTerm: movieDetails.title,
			movie_id: movieDetails.id,
			title: movieDetails.title,
			count: 1,
			poster_url: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
		};

		// save to recent search movies in the database
		saveRecentSearchMovies(db, recentSearchMovie);
	}, [movieDetails, db]);

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
		<View className="relative flex-1 bg-primary">
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

				{/* save movie button (floating button on top) */}
				<TouchableOpacity
					className="absolute p-3 rounded-full shadow-lg top-10 right-5"
					style={{ backgroundColor: isSaved ? '#AB8BFF' : '#030014' }}
					onPress={() => {
						saveMovieToDB(
							db,
							{
								movie_id: movieDetails!.id,
								title: movieDetails!.title,
								poster_url: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
							},
							setIsSaved,
						);
					}}
				>
					<Ionicons name="bookmark" size={20} color="#fff" />
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
