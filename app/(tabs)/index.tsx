import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
	// router
	const router = useRouter();

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
						<Header />
					</View>

					{/* SearchBar */}
					<View className="my-4">
						<SearchBar onPress={() => router.push('/search')} />
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
