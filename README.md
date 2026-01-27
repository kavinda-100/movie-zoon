# Movie Zoon 🎬

A feature-rich mobile application built with React Native and Expo that provides a seamless movie browsing experience using The Movie Database (TMDB) API. Users can discover popular movies, search for specific titles, save favorites, and maintain their viewing history.

## 🚀 Features

### Core Functionality

- **Browse Movies**: Discover popular and trending movies with infinite scroll pagination
- **Advanced Search**: Real-time movie search with debounced queries for optimal performance
- **Movie Details**: Comprehensive movie information including cast, budget, revenue, and ratings
- **Favorites Management**: Save and organize your favorite movies locally
- **Search History**: Intelligent recent search tracking with usage frequency
- **Offline Support**: Local SQLite database for saved data persistence

### User Experience

- **Responsive Design**: Optimized for various screen sizes using NativeWind
- **Smooth Navigation**: File-based routing with Expo Router
- **Pull-to-Refresh**: Update content with native refresh controls
- **Loading States**: Professional loading indicators and error handling
- **Dark Theme**: Beautiful dark UI with custom color palette

## 🛠 Tech Stack

### Frontend

- **React Native** (0.81.5) with Expo (54.0.31)
- **TypeScript** for enhanced type safety and developer experience
- **Expo Router** (6.0.21) for file-based navigation
- **NativeWind** (4.2.1) for Tailwind CSS styling in React Native

### State Management & Data Fetching

- **TanStack Query** (5.90.16) for server state management and caching
- **Custom Hooks** for clean separation of concerns

### Database & Storage

- **Expo SQLite** (16.0.10) for local data persistence
- **Custom database schemas** for saved movies and search history

### API Integration

- **TMDB API** for comprehensive movie data
- **Optimized fetch strategies** with error handling and retry logic

### Development Tools

- **ESLint** with Expo configuration for code quality
- **Prettier** with Tailwind plugin for consistent formatting
- **TypeScript** strict mode for robust type checking

## 📁 Project Architecture

```
movie-zoon/
├── app/                          # Application screens (Expo Router)
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx            # Home screen with movie grid
│   │   ├── search.tsx           # Search functionality
│   │   ├── saved.tsx            # Saved movies management
│   │   └── profile.tsx          # User settings and data management
│   ├── movies/
│   │   └── [id].tsx             # Dynamic movie details screen
│   ├── _layout.tsx              # Root layout with providers
│   └── global.css               # Global Tailwind styles
├── components/                   # Reusable UI components
│   ├── Header.tsx               # App header with logo
│   ├── MovieCard.tsx            # Movie grid item component
│   ├── SearchBar.tsx            # Search input component
│   └── RecentSearch.tsx         # Recent searches display
├── hooks/                        # Custom React hooks
│   ├── useFetchMovies.ts        # Infinite scroll movie fetching
│   ├── useFetchMovieById.ts     # Individual movie details
│   ├── useSearchMovies.ts       # Movie search functionality
│   ├── useGetSavedMovies.ts     # Saved movies management
│   └── useGetRecentSearchMovies.ts # Search history
├── services/                     # External API services
│   └── tmdb.ts                  # TMDB API integration
├── providers/                    # Context providers
│   ├── TanstackProvider.tsx     # Query client provider
│   └── SQLLiteProviders.tsx     # Database initialization
├── interfaces/                   # TypeScript type definitions
│   └── interfaces.d.ts          # Movie and app interfaces
├── lib/                         # Utility functions
│   └── index.ts                 # Helper functions
└── types/                       # Type declarations
    └── images.d.ts              # Image import types
```

## 🎯 Key Features Implementation

### Infinite Scroll Pagination

```typescript
// Efficient pagination with TanStack Query
const { fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
	queryKey: ['movies'],
	queryFn: ({ pageParam }) => fetchMovies({ pageParam }),
	// ... pagination logic
});
```

### Local Data Persistence

```typescript
// SQLite integration for offline functionality
const onInit = async (db: SQLiteDatabase) => {
	await db.execAsync(`
    CREATE TABLE IF NOT EXISTS saved_movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      movie_id INTEGER,
      title TEXT NOT NULL,
      poster_url TEXT NOT NULL
    );
  `);
};
```

### Smart Search with Debouncing

```typescript
// Optimized search with 500ms debounce
React.useEffect(() => {
	const timeout = setTimeout(() => {
		if (searchText.trim()) {
			setQuery(searchText);
		}
	}, 500);
	return () => clearTimeout(timeout);
}, [searchText]);
```

## 🚀 Getting Started

### Prerequisites

- Node.js (16.x or higher)
- Expo CLI
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/kavinda-100/movie-zoon.git
    cd movie-zoon
    ```

2. **Install dependencies**

    ```bash
    bun install
    ```

3. **Configure environment variables**

    ```bash
    # Create .env file
    EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
    ```

4. **Start the development server**

    ```bash
    bun start
    # or
    bun expo start
    ```

5. **Run on your preferred platform**
    - **Android**: Press `a` or run `bun run android`
    - **iOS**: Press `i` or run `bun run ios`
    - **Web**: Press `w` or run `bun run web`

## 📱 Supported Platforms

- ✅ **Android** (API level 21+)
- ✅ **iOS** (iOS 13+)
- ✅ **Web** (modern browsers)

## 🎨 Design System

### Color Palette

```javascript
colors: {
  primary: '#030014',      // Deep space blue
  secondary: '#151312',    // Dark charcoal
  accent: '#AB8BFF',       // Purple accent
  dark: {
    100: '#221f3d',        // Medium dark
    200: '#0f0d23',        // Darker blue
  },
  light: {
    100: '#D6C6FF',        // Light purple
    200: '#A8B5DB',        // Light blue
    300: '#9CA4AB',        // Light gray
  }
}
```

## 📊 Performance Optimizations

- **Image Optimization**: Lazy loading with optimized TMDB image URLs
- **Query Caching**: Efficient data caching with TanStack Query
- **Memory Management**: Proper component cleanup and subscription handling
- **Database Indexing**: Optimized SQLite queries for fast local data access
- **Bundle Optimization**: Tree shaking and code splitting

## 🧪 Available Scripts

```bash
bun start          # Start Expo development server
bun run android    # Run on Android device/emulator
bun run ios        # Run on iOS device/simulator
bun run web        # Run on web browser
bun run lint       # Run ESLint for code quality
```

## 📄 API Documentation

This app integrates with TMDB API endpoints:

- `/discover/movie` - Popular movies with pagination
- `/search/movie` - Movie search functionality
- `/movie/{id}` - Detailed movie information

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Expo](https://expo.dev/) for the excellent React Native development platform
- [TanStack Query](https://tanstack.com/query) for powerful data synchronization
- [NativeWind](https://www.nativewind.dev/) for bringing Tailwind CSS to React Native

## 📞 Contact

**Kavinda Senarathne** - [@kavinda-100](https://github.com/kavinda-100)

Project Link: [https://github.com/kavinda-100/movie-zoon](https://github.com/kavinda-100/movie-zoon)

---

⭐ Don't forget to give this project a star if you found it helpful!
