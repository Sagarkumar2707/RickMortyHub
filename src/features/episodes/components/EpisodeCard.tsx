import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Episode } from '@types/api.types';
import { Colors } from '@constants/colors';

interface EpisodeCardProps {
  episode: Episode;
  onPress: (episode: Episode) => void;
}

/**
 * Episode card component with spring press animation.
 * Shows episode code, name, air date, stacked avatars and character count.
 *
 * @param episode - The Episode object to display
 * @param onPress - Callback when card is pressed
 */
const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.97, { damping: 15 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15 });
  }, [scale]);

  const handlePress = useCallback(() => {
    onPress(episode);
  }, [episode, onPress]);

  return (
    <Animated.View style={[styles.cardWrapper, animatedStyle]}>
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Top Row */}
        <View style={styles.topRow}>
          <View style={styles.episodeBadge}>
            <Text style={styles.episodeCode}>{episode.episode}</Text>
          </View>
          <Text style={styles.movieIcon}>🎬</Text>
        </View>

        {/* Middle Content */}
        <View style={styles.middleContent}>
          <Text style={styles.name} numberOfLines={1}>
            {episode.name}
          </Text>
          <View style={styles.airDateRow}>
            <Text style={styles.calendarIcon}>📅</Text>
            <Text style={styles.airDate}>{episode.air_date}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bottom Row */}
        <View style={styles.bottomRow}>
          <Text style={styles.charactersText}>
            {episode.characters.length} CHARACTERS
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  episodeBadge: {
    backgroundColor: 'rgba(0, 181, 204, 0.1)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.neonCyanMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  episodeCode: {
    color: Colors.neonCyan,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  movieIcon: {
    fontSize: 18,
    opacity: 0.7,
  },
  middleContent: {
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  airDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  calendarIcon: {
    fontSize: 14,
    opacity: 0.7,
  },
  airDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  charactersText: {
    color: Colors.neonCyan,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
});

export default React.memo(EpisodeCard);
