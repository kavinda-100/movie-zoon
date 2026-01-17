import Header from '@/components/Header';
import { useGetSavedMovies } from '@/hooks/useGetSavedMovies';
import { Link } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	Image,
	RefreshControl,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SavedScreen = () => {
	//db context
	const db = useSQLiteContext();
	// fetch saved movies
	const { savedMovies, isPending, error, getSavedMovies } =
		useGetSavedMovies(db);

	// refresh state
	const [refreshing, setRefreshing] = React.useState(false);

	// fetch saved movies on mount
	React.useEffect(() => {
		getSavedMovies();
	}, [getSavedMovies]);

	// handle refresh
	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		try {
			await Promise.all([getSavedMovies()]);
		} catch (error) {
			console.error('Error refreshing:', error);
		} finally {
			setRefreshing(false);
		}
	}, [getSavedMovies]);

	// render loading state
	if (isPending) {
		return (
			<View className="items-center justify-center flex-1 bg-primary">
				<SafeAreaView className="flex-1">
					{/* header */}
					<View className="my-4 mt-10">
						<Header label="Saved Movies" />
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

	// render error state
	if (error) {
		return (
			<View className="items-center justify-center flex-1 px-5 bg-primary">
				<SafeAreaView className="flex-1">
					{/* header */}
					<View className="my-4 mt-10">
						<Header label="Saved Movies" />
					</View>

					<View className="mt-10">
						<Text className="text-center text-white">
							{error ??
								'Something went wrong while fetching movies.'}
						</Text>
					</View>
				</SafeAreaView>
			</View>
		);
	}

	// render saved movies list
	return (
		<View className="flex-1 px-3 bg-primary">
			<SafeAreaView className="flex-1">
				{/* header */}
				<View className="my-4 mt-10">
					<Header label="Saved Movies" />
				</View>

				{/* movies list */}
				<FlatList
					data={savedMovies}
					renderItem={({ item }) => (
						<Link href={`/movies/${item.movie_id}`} asChild>
							<TouchableOpacity className="w-[30%]">
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
							</TouchableOpacity>
						</Link>
					)}
					keyExtractor={(item) => item.movie_id.toString()}
					columnWrapperStyle={{
						justifyContent: 'flex-start',
						gap: 20,
						marginBottom: 15,
						marginTop: 25,
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
};

export default SavedScreen;
