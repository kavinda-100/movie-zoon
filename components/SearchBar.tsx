import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View } from 'react-native';

type SearchBarProps = {
	onPress: () => void;
	value?: string;
	onChangeText?: (text: string) => void;
};

const SearchBar = ({ onPress, value, onChangeText }: SearchBarProps) => {
	return (
		<View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
			<Ionicons name="search" size={20} color="#888" />
			<TextInput
				placeholder="Search movies, TV shows..."
				placeholderTextColor="#888"
				className="ml-3 flex-1 text-white"
				value={value}
				onPress={onPress}
				onChangeText={onChangeText}
			/>
		</View>
	);
};

export default SearchBar;
