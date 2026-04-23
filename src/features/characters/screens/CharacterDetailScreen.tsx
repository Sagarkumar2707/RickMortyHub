import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@types/api.types';
import { ErrorScreen, CharacterDetailSkeleton } from '@components/index';
import { useFavourite } from '@hooks/index';
import useCharacterDetail from '../hooks/useCharacterDetail';
import useEpisodeIds from '../hooks/useEpisodeIds';
import EpisodeChip from '../components/EpisodeChip';
import { StatusBadge } from '@components/index';
import { styles } from './CharacterDetailScreen.styles';

type CharacterDetailRouteProp = RouteProp<
  RootStackParamList,
  'CharacterDetail'
>;

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

/**
 * Character detail screen.
 * Shows full character info, origin, location,
 * favourite toggle and horizontally scrollable episode list.
 */
const CharacterDetailScreen: React.FC = () => {
  const route = useRoute<CharacterDetailRouteProp>();
  const navigation = useNavigation();
  const { characterId } = route.params;

  const {
    data: character,
    isLoading,
    isError,
    error,
    refetch,
  } = useCharacterDetail(characterId);

  const episodeIds = useEpisodeIds(character?.episode ?? []);

  const { isFavourite, toggleFavourite } = useFavourite(
    character ?? {
      id: 0,
      name: '',
      status: 'unknown',
      species: '',
      type: '',
      gender: 'unknown',
      origin: { name: '', url: '' },
      location: { name: '', url: '' },
      image: '',
      episode: [],
      url: '',
      created: '',
    },
  );

  const renderEpisodeChip = useCallback(
    ({ item }: { item: number }) => <EpisodeChip episodeId={item} />,
    [],
  );

  const keyExtractor = useCallback(
    (item: number) => `episode-chip-${item}`,
    [],
  );

  if (isLoading) {
    return <CharacterDetailSkeleton />;
  }

  if (isError || !character) {
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
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>CHARACTER INTEL</Text>

        <TouchableOpacity
          onPress={toggleFavourite}
          style={styles.favouriteButton}
          activeOpacity={0.7}
        >
          <Text style={[styles.heartIcon, isFavourite && styles.heartIconActive]}>
            {isFavourite ? '\u2665\uFE0E' : '\u2661\uFE0E'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <AnimatedFastImage
            style={styles.avatar}
            source={{
              uri: character.image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            sharedTransitionTag={`character-image-${character.id}`}
          />
        </View>

        {/* Name + Status */}
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.statusRow}>
          <View style={styles.pill}>
            <StatusBadge status={character.status} />
          </View>
          <View style={styles.pill}>
            <Text style={styles.speciesText}>
              {character.species.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Info Cards */}
        <Text style={styles.sectionTitle}>Biometric Data</Text>
        <View style={styles.infoGrid}>
          <InfoRow label="Gender" value={character.gender} />
          <InfoRow label="Type" value={character.type || 'N/A'} />
          <InfoRow label="Origin" value={character.origin.name} />
          <InfoRow label="Location" value={character.location.name} />
          <InfoRow
            label="First Seen"
            value={new Date(character.created).toLocaleDateString()}
          />
        </View>

        {/* Episodes */}
        <Text style={styles.sectionTitle}>Episodes ({episodeIds.length})</Text>
        <FlatList
          data={episodeIds}
          renderItem={renderEpisodeChip}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.episodesList}
          style={styles.episodesFlatList}
        />
      </ScrollView>
    </View>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export default CharacterDetailScreen;
