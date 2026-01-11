import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
	const [searchText, setSearchText] = React.useState('');

	return (
		<View className="flex-1 bg-primary">
			<SafeAreaView className="flex-1">
				{/* content */}
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: 20,
						minHeight: '100%',
					}}
					className="flex-1 px-5"
				>
					{/* header */}
					<View className="my-4 mt-10">
						<Header label="Search Movies" />
					</View>

					{/* SearchBar */}
					<View className="my-4">
						<SearchBar
							onPress={() => {}}
							value={searchText}
							onChangeText={setSearchText}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

export default SearchScreen;
