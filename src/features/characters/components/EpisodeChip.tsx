import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchEpisodeById } from '@api/axiosInstance';
import { Episode, RootStackParamList } from '@types/api.types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface EpisodeChipProps {
  episodeId: number;
}

/**
 * Individual episode chip shown in the Character Detail screen.
 * Lazily fetches episode data by ID.
 * Navigates to EpisodeDetail on press.
 *
 * @param episodeId - The episode ID to fetch and display
 */
const EpisodeChip: React.FC<EpisodeChipProps> = ({ episodeId }) => {
  const navigation = useNavigation<NavigationProp>();

  const { data, isLoading } = useQuery<Episode, Error>({
    queryKey: ['episode', episodeId],
    queryFn: () => fetchEpisodeById(episodeId),
    staleTime: 10 * 60 * 1000,
  });

  const handlePress = () => {
    navigation.navigate('EpisodeDetail', { episodeId });
  };

  if (isLoading) {
    return (
      <View style={styles.chip}>
        <ActivityIndicator size="small" color="#00B5CC" />
      </View>
    );
  }

  if (!data) return null;

  return (
    <TouchableOpacity
      style={styles.chip}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={styles.episodeCode}>{data.episode}</Text>
      <Text style={styles.episodeName} numberOfLines={1}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#0F3460',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#1E4D8C',
  },
  episodeCode: {
    color: '#00B5CC',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  episodeName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    maxWidth: 140,
  },
});

export default React.memo(EpisodeChip);
