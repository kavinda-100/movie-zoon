import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
	return (
		<View className="flex-1 bg-primary">
			<SafeAreaView className="flex-1">
				<Text className="text-5xl text-blue-500 font-bold">
					Welcome
				</Text>
			</SafeAreaView>
		</View>
	);
}
