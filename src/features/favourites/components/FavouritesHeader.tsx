import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@constants/colors';

interface FavouritesHeaderProps {
  count: number;
  onClearAll: () => void;
}

/**
 * Header component for the Favourites screen.
 * Shows neon title, saved character count and clear all button.
 */
const FavouritesHeader: React.FC<FavouritesHeaderProps> = ({
  count,
  onClearAll,
}) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>FAVOURITES</Text>
      <Text style={styles.subtitle}>
        {count} SAVED CHARACTER{count !== 1 ? 'S' : ''}
      </Text>
    </View>
    {count > 0 && (
      <TouchableOpacity
        style={styles.clearButton}
        onPress={onClearAll}
        activeOpacity={0.7}
      >
        <Text style={styles.clearText}>CLEAR ALL</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 52,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.bgDeep,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.neonCyan,
    letterSpacing: 1.5,
    textShadowColor: Colors.neonCyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 4,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.statusDead,
  },
  clearText: {
    color: Colors.statusDead,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
});

export default React.memo(FavouritesHeader);
