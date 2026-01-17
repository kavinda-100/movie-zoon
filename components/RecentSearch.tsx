import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const RecentSearch = ({
	recentSearchMovies,
}: {
	recentSearchMovies: RecentSearchMovie[];
}) => {
	return (
		<View className="flex w-full">
			{/* Title */}
			<Text className="mb-4 text-lg font-semibold text-white">
				Recent Search Movies
			</Text>

			{/* List */}
			<FlatList
				data={recentSearchMovies}
				renderItem={({ item }) => (
					<Link href={`/movies/${item.movie_id}`} asChild>
						<TouchableOpacity className="relative w-32 mr-4">
							{/* poster */}
							<Image
								source={{
									uri: item.poster_url
										? `https://image.tmdb.org/t/p/w500${item.poster_url}`
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
								{item.title}
							</Text>

							{/* count */}
							<Text className="absolute px-2.5 py-1 text-sm text-white bg-black rounded-full top-2 right-2 bg-opacity-60">
								{item.count}
							</Text>
						</TouchableOpacity>
					</Link>
				)}
				keyExtractor={(item) => item.movie_id.toString()}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				className="w-full mt-2"
			/>
		</View>
	);
};

export default RecentSearch;
