import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { RootStackParamList, Character } from '@types/api.types';
import { ErrorScreen, SkeletonLoader } from '@components/index';
import { fetchCharactersByIds } from '@api/axiosInstance';
import useEpisodeDetail from '../hooks/useEpisodeDetail';
import { extractCharacterIds } from '../utils/episodeUtils';
import { styles } from './EpisodeDetailScreen.styles';

type EpisodeDetailRouteProp = RouteProp<RootStackParamList, 'EpisodeDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Episode detail screen.
 * Shows episode info and a grid of character avatars
 * who appeared in the episode with lazy loaded images.
 */
const EpisodeDetailScreen: React.FC = () => {
  const route = useRoute<EpisodeDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { episodeId } = route.params;

  const {
    data: episode,
    isLoading,
    isError,
    error,
    refetch,
  } = useEpisodeDetail(episodeId);

  const characterIds = useMemo(
    () => extractCharacterIds(episode?.characters ?? []),
    [episode],
  );

  const { data: characters, isLoading: isLoadingChars } = useQuery<
    Character[],
    Error
  >({
    queryKey: ['episodeCharacters', episodeId],
    queryFn: () => fetchCharactersByIds(characterIds),
    enabled: characterIds.length > 0,
    staleTime: 10 * 60 * 1000,
  });

  const handleCharacterPress = useCallback(
    (id: number) => {
      navigation.navigate('CharacterDetail', { characterId: id });
    },
    [navigation],
  );

  const renderCharacter = useCallback(
    ({ item }: { item: Character }) => (
      <TouchableOpacity
        style={styles.characterItem}
        activeOpacity={0.7}
        onPress={() => handleCharacterPress(item.id)}
      >
        <View style={styles.avatarContainer}>
          <FastImage
            style={styles.characterAvatar}
            source={{
              uri: item.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <Text style={styles.characterName} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    ),
    [handleCharacterPress],
  );

  const keyExtractor = useCallback((item: Character) => `char-${item.id}`, []);

  const renderHeader = useCallback(() => {
    if (!episode) return null;
    return (
      <View style={styles.headerContainer}>
        {/* Premium Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.episodeBadge}>
            <Text style={styles.episodeCode}>{episode.episode}</Text>
          </View>
          <Text style={styles.name}>{episode.name}</Text>
          <Text style={styles.airDate}>Air Date: {episode.air_date}</Text>
        </View>

        <Text style={styles.sectionTitle}>
          Characters [{episode.characters.length}]
        </Text>
      </View>
    );
  }, [episode]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00B5CC" />
      </View>
    );
  }

  if (isError || !episode) {
    return <ErrorScreen message={error?.message} onRetry={() => refetch()} />;
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content List */}
      {isLoadingChars ? (
        <View style={styles.loadingCharsContainer}>
          {renderHeader()}
          <View style={styles.skeletonGrid}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <View key={i} style={styles.skeletonItem}>
                <SkeletonLoader width={90} height={90} borderRadius={45} />
                <SkeletonLoader
                  width={60}
                  height={10}
                  borderRadius={4}
                  style={styles.skeletonName}
                />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          data={characters ?? []}
          renderItem={renderCharacter}
          keyExtractor={keyExtractor}
          numColumns={3}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

export default EpisodeDetailScreen;
