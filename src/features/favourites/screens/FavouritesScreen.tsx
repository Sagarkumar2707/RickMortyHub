import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FavouriteCharacter, RootStackParamList } from '@types/api.types';
import { useAppDispatch, useAppSelector } from '@store/index';
import { removeFavouriteThunk } from '@store/slices/favouritesSlice';
import { View as RNView, Text as RNText, StyleSheet as RNStyleSheet } from 'react-native';
import { OfflineBanner } from '@components/index';
import { useNetworkStatus } from '@hooks/index';
import { Colors } from '@constants/colors';
import FavouriteCard from '../components/FavouriteCard';
import FavouritesHeader from '../components/FavouritesHeader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Favourites screen — fully offline capable.
 * Reads saved characters from Redux state (loaded from SQLite).
 * No API calls are made on this screen.
 * Features: animated card removal, clear all, offline banner.
 */
const FavouritesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector(
    state => state.favourites,
  );
  const { isConnected } = useNetworkStatus();

  const handleCardPress = useCallback(
    (character: FavouriteCharacter) => {
      navigation.navigate('CharacterDetail', {
        characterId: character.id,
      });
    },
    [navigation],
  );

  /**
   * Clears all favourites after user confirms the alert.
   * Dispatches removeFavouriteThunk for each item individually
   * so SQLite stays in sync.
   */
  const handleClearAll = useCallback(() => {
    Alert.alert(
      'Clear All Favourites',
      'Are you sure you want to remove all saved characters?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            items.forEach(item => {
              dispatch(removeFavouriteThunk(item.id));
            });
          },
        },
      ],
    );
  }, [items, dispatch]);

  const renderItem = useCallback(
    ({ item }: { item: FavouriteCharacter }) => (
      <FavouriteCard
        character={item}
        onPress={handleCardPress}
      />
    ),
    [handleCardPress],
  );

  const keyExtractor = useCallback(
    (item: FavouriteCharacter) => `favourite-${item.id}`,
    [],
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.neonCyanMuted} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Offline Banner */}
      {!isConnected && <OfflineBanner />}

      {/* Header */}
      <FavouritesHeader
        count={items.length}
        onClearAll={handleClearAll}
      />

      {/* Favourites List */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <RNView style={emptyStyles.container}>
            <RNView style={emptyStyles.iconWrapper}>
              <RNText style={emptyStyles.icon}>💔</RNText>
            </RNView>
            <RNText style={emptyStyles.title}>NO FAVOURITES YET</RNText>
            <RNText style={emptyStyles.subtitle}>
              Tap ♥ on any character to save them here
            </RNText>
          </RNView>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgDeep,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 32,
    flexGrow: 1,
  },
});

const emptyStyles = RNStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 80,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: Colors.neonCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  icon: {
    fontSize: 44,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.textPrimary,
    letterSpacing: 2,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textInactive,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
});

export default FavouritesScreen;
