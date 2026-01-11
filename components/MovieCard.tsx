import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

const MovieCard = ({ movie }: { movie: Movie }) => {
	return (
		<Link href={`/movies/${movie.id}`} asChild>
			<TouchableOpacity className="w-[30%]">
				<Image
					source={{
						uri: movie.poster_path
							? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
							: `https://placehold.co/600x400/1a1a1a/ffffff.png`,
					}}
					className="w-full rounded-lg h-52"
					resizeMode="cover"
				/>
				<Text
					className="mt-2 text-sm font-bold text-white"
					numberOfLines={1}
				>
					{movie.title}
				</Text>
			</TouchableOpacity>
		</Link>
	);
};

export default MovieCard;
