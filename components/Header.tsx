import React from 'react';
import { Image, Text, View } from 'react-native';

type HeaderProps = {
	label?: string;
};

const Header = ({ label }: HeaderProps) => {
	return (
		<View className="w-full h-20 justify-center items-center">
			<Image
				source={require('../assets/logo.png')}
				className="w-40 h-20"
				resizeMode="contain"
			/>
			<Text className="text-white text-2xl font-bold">
				{label ? label : 'Movie Zoon'}
			</Text>
		</View>
	);
};

export default Header;
