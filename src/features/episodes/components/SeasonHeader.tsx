import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@constants/colors';

interface SeasonHeaderProps {
  season: string;
  episodeCount: number;
}

/**
 * Season section header component for the episodes list.
 * Shows season name and episode count.
 *
 * @param season - Season label e.g. 'Season 1'
 * @param episodeCount - Number of episodes in the season
 */
const SeasonHeader: React.FC<SeasonHeaderProps> = ({
  season,
  episodeCount,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{season}</Text>
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{episodeCount} eps</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 8,
    backgroundColor: Colors.borderAccent,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.neonCyanMuted,
  },
  badge: {
    backgroundColor: Colors.borderLight,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default React.memo(SeasonHeader);
