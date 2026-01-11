import Header from '@/components/Header';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
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
					<Header />

					{/* SearchBar */}
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
