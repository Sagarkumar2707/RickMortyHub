import React, { useCallback, useMemo, useRef } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Location, RootStackParamList } from '@types/api.types';
import { useDebounce } from '@hooks/index';
import { Colors } from '@constants/colors';
import { ListItemSkeleton, ErrorScreen, EmptyState } from '@components/index';
// ... (rest of imports)
import LocationCard from '../components/LocationCard';
import useLocations from '../hooks/useLocations';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Locations list screen.
 * Features: infinite scroll, debounced search,
 * hide-on-scroll header, skeleton loaders,
 * error and empty states.
 */
const LocationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Manual clamp — fixes iOS bug where diffClamp+useNativeDriver causes header to
  // get stuck after scrolling down (never returns on scroll up)
  const headerHeight = 100;
  const headerTranslate = useRef(new Animated.Value(0)).current;
  const prevScrollY = useRef(0);
  const currentHeaderOffset = useRef(0);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const rawY = e.nativeEvent.contentOffset.y;
      const currentY = Math.max(0, rawY);

      if (currentY === 0) {
        prevScrollY.current = 0;
        currentHeaderOffset.current = 0;
        headerTranslate.setValue(0);
        return;
      }

      const diff = currentY - prevScrollY.current;
      prevScrollY.current = currentY;
      const newOffset = Math.min(
        0,
        Math.max(-headerHeight, currentHeaderOffset.current - diff),
      );
      currentHeaderOffset.current = newOffset;
      headerTranslate.setValue(newOffset);
    },
    [headerHeight, headerTranslate],
  );

  const [searchText, setSearchText] = React.useState<string>('');
  const debouncedSearch = useDebounce<string>(searchText, 300);

  const filters = useMemo(() => ({ name: debouncedSearch }), [debouncedSearch]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useLocations(filters);

  const locations = useMemo(
    () => data?.pages.flatMap(page => page.results) ?? [],
    [data],
  );

  const handleCardPress = useCallback(
    (location: Location) => {
      navigation.navigate('LocationDetail', {
        locationId: location.id,
      });
    },
    [navigation],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: Location }) => (
      <LocationCard location={item} onPress={handleCardPress} />
    ),
    [handleCardPress],
  );

  const keyExtractor = useCallback(
    (item: Location) => `location-${item.id}`,
    [],
  );

  const ListFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <ActivityIndicator
        size="small"
        color={Colors.neonCyanMuted}
        style={styles.footerLoader}
      />
    );
  }, [isFetchingNextPage]);

  const renderSkeletons = () =>
    Array.from({ length: 8 }).map((_, i) => (
      <ListItemSkeleton key={`skeleton-${i}`} />
    ));

  if (isError) {
    return <ErrorScreen message={error?.message} onRetry={() => refetch()} />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslate }],
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            zIndex: 100,
          },
        ]}
      >
        <Text style={styles.headerTitle}>Locations</Text>
      </Animated.View>

      {/* List */}
      <Animated.FlatList
        data={isLoading ? [] : locations}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: headerHeight + 16 },
        ]}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        ListEmptyComponent={
          isLoading ? (
            <>{renderSkeletons()}</>
          ) : (
            <EmptyState
              title="No Locations Found"
              message="Try a different search term."
              emoji="🌍"
            />
          )
        }
        ListFooterComponent={<ListFooter />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  header: {
    backgroundColor: Colors.bgPrimary,
    paddingTop: 52,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.neonCyan,
    letterSpacing: 1.5,
    textShadowColor: Colors.neonCyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  listContent: {
    paddingBottom: 32,
    paddingTop: 16,
  },
  footerLoader: {
    marginVertical: 16,
  },
});

export default LocationsScreen;
