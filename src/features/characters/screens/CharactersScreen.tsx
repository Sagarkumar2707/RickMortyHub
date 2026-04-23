import React, { useCallback, useMemo, useState, useRef } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Character, RootStackParamList } from '@types/api.types';
import { useAppDispatch, useAppSelector } from '@store/index';
import { setCharacterName } from '@store/slices/filtersSlice';
import { useDebounce } from '@hooks/index';
import { Colors } from '@constants/colors';
import {
  CharacterCardSkeleton,
  ErrorScreen,
  EmptyState,
} from '@components/index';
// ... (rest of imports)
import CharacterCard from '../components/CharacterCard';
import CharacterFilter from '../components/CharacterFilter';
import FilterIcon from '../components/FilterIcon';
import useCharacters from '../hooks/useCharacters';
import { styles } from './CharacterScreen.styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const CharactersScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const { characterName, characterStatus, characterGender } = useAppSelector(
    state => state.filters,
  );

  // Animation values — manual clamp replaces Animated.diffClamp which is broken on iOS
  // with useNativeDriver (header gets stuck when scrolling back up)
  const headerHeight = 210;
  const headerTranslate = useRef(new Animated.Value(0)).current;
  const prevScrollY = useRef(0);
  const currentHeaderOffset = useRef(0);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const rawY = e.nativeEvent.contentOffset.y;

      // iOS bounce: rawY goes negative when pulling past the top.
      // Clamp to 0 so the snap-back doesn't produce a large positive diff
      // that pushes the header out of view.
      const currentY = Math.max(0, rawY);

      // When at the very top, always snap header back to fully visible.
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

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const debouncedName = useDebounce<string>(characterName, 300);

  const filters = useMemo(
    () => ({
      name: debouncedName,
      status: characterStatus,
      gender: characterGender,
    }),
    [debouncedName, characterStatus, characterGender],
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useCharacters(filters);

  const characters = useMemo(
    () => data?.pages.flatMap(page => page.results) ?? [],
    [data],
  );

  const handleCardPress = useCallback(
    (character: Character) => {
      navigation.navigate('CharacterDetail', {
        characterId: character.id,
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
    ({ item }: { item: Character }) => (
      <CharacterCard character={item} onPress={handleCardPress} />
    ),
    [handleCardPress],
  );

  const keyExtractor = useCallback(
    (item: Character) => `character-${item.id}`,
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
    Array.from({ length: 6 }).map((_, i) => (
      <CharacterCardSkeleton key={`skeleton-${i}`} />
    ));

  if (isError) {
    return <ErrorScreen message={error?.message} onRetry={() => refetch()} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />

      {/* Header Area */}
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
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>RICK & MORTY</Text>
          <Text style={styles.headerSubtitle}>
            Discover the Universe's Most Interesting Inhabitants
          </Text>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Multi-verse..."
              placeholderTextColor={Colors.textInactive}
              value={characterName}
              onChangeText={text => dispatch(setCharacterName(text))}
            />
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setIsFilterVisible(true)}
            activeOpacity={0.7}
          >
            <FilterIcon />
          </TouchableOpacity>
        </View>

        <CharacterFilter
          isVisible={isFilterVisible}
          onClose={() => setIsFilterVisible(false)}
        />
      </Animated.View>

      {/* List Area */}
      <Animated.FlatList
        data={isLoading ? [] : characters}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: headerHeight + 10 },
        ]}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        ListEmptyComponent={
          isLoading ? (
            <>{renderSkeletons()}</>
          ) : (
            <EmptyState
              title="No Characters Found"
              message="Try a different name or clear your filters."
              emoji="👽"
            />
          )
        }
        ListFooterComponent={<ListFooter />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CharactersScreen;
