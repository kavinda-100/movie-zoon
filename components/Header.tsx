import React from 'react';
import { Image, Text, View } from 'react-native';

const Header = () => {
	return (
		<View className="w-full h-20 justify-center items-center pt-10">
			<Image
				source={require('../assets/logo.png')}
				className="w-40 h-20"
				resizeMode="contain"
			/>
			<Text className="text-white text-2xl font-bold">Movie Zoon</Text>
		</View>
	);
};

export default Header;
