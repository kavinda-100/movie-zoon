import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';
import React, { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';

// interface RecentSearchMovie {
//     searchTerm: string;
//     movie_id: number;
//     title: string;
//     count: number;
//     poster_url: string;
//   }

const onInit = async (db: SQLiteDatabase) => {
	try {
		await db.execAsync(`
            CREATE TABLE IF NOT EXISTS recent_search_movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                searchTerm TEXT NOT NULL,
                movie_id INTEGER,
                title TEXT NOT NULL,
                count INTEGER,
                poster_url TEXT NOT NULL
            );
        `);
		console.log('Database initialized successfully.');
	} catch (error) {
		console.error('Error during database initialization:', error);
	}
};

const SQLLiteProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<Suspense fallback={<Fallback />}>
			<SQLiteProvider
				databaseName="movie.db"
				onInit={onInit}
				useSuspense={true}
			>
				{children}
			</SQLiteProvider>
		</Suspense>
	);
};

export default SQLLiteProviders;

// Fallback component.
const Fallback = () => {
	return (
		<View className="items-center justify-center flex-1 bg-primary">
			<ActivityIndicator size="large" color="#ffff" />
		</View>
	);
};
