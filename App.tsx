import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from '@store/index';
import { initDatabase } from '@database/db';
import { loadFavourites } from '@store/slices/favouritesSlice';
import RootNavigator from '@navigation/RootNavigator';
import { OfflineBanner } from '@components/index';
import { Colors } from '@constants/colors';

// ============================================================
// QUERY CLIENT CONFIGURATION
// ============================================================

/**
 * Global React Query client configuration.
 * - staleTime: 5 minutes default for all queries
 * - retry: 2 attempts on failure
 * - refetchOnWindowFocus: disabled for mobile
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// ============================================================
// APP INITIALIZER COMPONENT
// ============================================================

/**
 * AppInitializer handles all startup side effects:
 * 1. Initializes the SQLite database schema
 * 2. Loads saved favourites from SQLite into Redux
 * Runs once on app mount.
 */
const AppInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    const initialize = async () => {
      try {
        // Step 1: Create SQLite tables if not exist
        await initDatabase();

        // Step 2: Load favourites from SQLite into Redux
        store.dispatch(loadFavourites());

        if (__DEV__) {
          console.log('[App] Initialization complete');
        }
      } catch (error) {
        if (__DEV__) {
          console.error('[App] Initialization failed:', error);
        }
      }
    };

    initialize();
  }, []);

  return <>{children}</>;
};

// ============================================================
// ROOT APP COMPONENT
// ============================================================

/**
 * Root App component.
 * Wraps the entire app with:
 * - GestureHandlerRootView (required for Reanimated gestures)
 * - SafeAreaProvider (required for safe area insets)
 * - Redux Provider (global state management)
 * - QueryClientProvider (React Query data fetching)
 * - AppInitializer (SQLite + favourites startup)
 * - RootNavigator (navigation tree)
 * - OfflineBanner (global offline indicator)
 */
const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <AppInitializer>
              <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.bgPrimary}
              />
              <View style={styles.container}>
                <RootNavigator />
                <OfflineBanner />
              </View>
            </AppInitializer>
          </QueryClientProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
});

export default App;
