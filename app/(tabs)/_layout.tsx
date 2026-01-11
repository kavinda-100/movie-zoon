import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabLayout = () => {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					title: 'Home',
					tabBarIcon(props) {
						return (
							<Ionicons
								name="home"
								size={props.size}
								color={props.color}
							/>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					headerShown: false,
					title: 'Search',
					tabBarIcon(props) {
						return (
							<Ionicons
								name="search"
								size={props.size}
								color={props.color}
							/>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="saved"
				options={{
					headerShown: false,
					title: 'Saved',
					tabBarIcon(props) {
						return (
							<Ionicons
								name="bookmark"
								size={props.size}
								color={props.color}
							/>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					headerShown: false,
					title: 'Profile',
					tabBarIcon(props) {
						return (
							<Ionicons
								name="person"
								size={props.size}
								color={props.color}
							/>
						);
					},
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
