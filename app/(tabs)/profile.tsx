import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// clear recent search history function
const clearRecentSearchHistory = async (db: SQLiteDatabase) => {
	try {
		// confirm before clearing
		Alert.alert(
			'Confirm',
			'Are you sure you want to clear your recent search history?',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Yes',
					onPress: async () => {
						try {
							await db.runAsync(
								`DELETE FROM recent_search_movies`,
							);
							Alert.alert(
								'Success',
								'Recent search history cleared successfully.',
							);
						} catch (error) {
							console.error(
								'Error clearing recent search history:',
								error,
							);
							Alert.alert(
								'Error',
								'Failed to clear recent search history. Please try again.',
							);
						}
					},
				},
			],
		);
	} catch (error) {
		console.error('Error clearing recent search history:', error);
		Alert.alert(
			'Error',
			'Failed to clear recent search history. Please try again.',
		);
	}
};

// clear saved movies function
const clearSavedMovies = async (db: SQLiteDatabase) => {
	try {
		// confirm before clearing
		Alert.alert(
			'Confirm',
			'Are you sure you want to clear your saved movies?',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Yes',
					onPress: async () => {
						try {
							await db.runAsync(`DELETE FROM saved_movies`);
							Alert.alert(
								'Success',
								'Saved movies cleared successfully.',
							);
						} catch (error) {
							console.error(
								'Error clearing saved movies:',
								error,
							);
							Alert.alert(
								'Error',
								'Failed to clear saved movies. Please try again.',
							);
						}
					},
				},
			],
		);
	} catch (error) {
		console.error('Error clearing saved movies:', error);
		Alert.alert('Error', 'Failed to clear saved movies. Please try again.');
	}
};

// profile screen
const ProfileScreen = () => {
	// db context
	const db = useSQLiteContext();

	// render
	return (
		<View className="flex-1 bg-primary">
			<SafeAreaView className="flex-1">
				{/* header */}
				<View className="my-4 mt-10">
					<Header label="Profile" />
				</View>

				{/* content */}
				<View className="flex-1 mt-10">
					{/* clear recent search history button */}
					<Button
						label="Clear Recent Search History"
						onPress={() => clearRecentSearchHistory(db)}
						iconName="trash-bin"
					/>

					{/* clear saved movies button */}
					<Button
						label="Clear Saved Movies"
						onPress={() => clearSavedMovies(db)}
						iconName="bookmark"
					/>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default ProfileScreen;

// reusable button component
const Button = ({
	label,
	onPress,
	iconName,
}: {
	label: string;
	onPress: () => void;
	iconName: any;
}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View className="flex flex-row items-center justify-between gap-3 px-5 py-4 mx-4 mt-5 rounded-md bg-accent/30">
				{/* Text */}
				<Text className="text-lg font-medium text-white">{label}</Text>

				{/* icon */}
				<Ionicons name={iconName} size={24} color="#AB8BFF" />
			</View>
		</TouchableOpacity>
	);
};
