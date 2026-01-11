import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveTintColor: '#AB8BFF',
				tabBarInactiveTintColor: '#888',
				tabBarItemStyle: {
					width: '100%',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					paddingVertical: 10,
				},
				tabBarStyle: {
					backgroundColor: '#0f0D23',
					borderRadius: 20,
					marginHorizontal: 10,
					marginBottom: 36,
					height: 30,
					position: 'absolute',
					overflow: 'hidden',
					borderWidth: 1,
					borderColor: '#0f0D23',
				},
			}}
		>
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
