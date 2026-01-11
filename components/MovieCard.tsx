import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const getHowManyStarts = (rating: number) => {
	return Math.round(rating / 2);
};

const MovieCard = ({ movie }: { movie: Movie }) => {
	return (
		<Link href={`/movies/${movie.id}`} asChild>
			<TouchableOpacity className="w-[30%]">
				{/* poster */}
				<Image
					source={{
						uri: movie.poster_path
							? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
							: `https://placehold.co/600x400/1a1a1a/ffffff.png`,
					}}
					className="w-full rounded-lg h-52"
					resizeMode="cover"
				/>

				{/* title */}
				<Text
					className="mt-2 text-sm font-bold text-white"
					numberOfLines={1}
				>
					{movie.title}
				</Text>

				{/* stars */}
				<View className="flex-row items-center justify-start gap-x-1">
					{[...Array(getHowManyStarts(movie.vote_average))].map(
						(_, index) => (
							<Ionicons
								key={index}
								name="star"
								size={10}
								color="#FFD700"
							/>
						),
					)}
				</View>

				{/* ratings and date */}
				<View className="flex-row justify-between">
					<Text className="text-xs text-white">
						{movie.vote_average.toFixed(1)}
					</Text>
					<Text className="text-xs text-white">
						{movie.release_date?.split('-')[0]}
					</Text>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default MovieCard;
