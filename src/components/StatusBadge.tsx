import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { CharacterStatus } from '@types/api.types';
import { Colors } from '@constants/colors';

/**
 * Color mapping for character status values
 */
const STATUS_COLORS: Record<CharacterStatus, string> = {
  Alive: Colors.statusAlive,
  Dead: Colors.statusDead,
  unknown: Colors.textDisabled,
};

/**
 * Status badge component for character cards.
 * Shows a colored dot and status text.
 *
 * @param status - CharacterStatus value ('Alive' | 'Dead' | 'unknown')
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const color = STATUS_COLORS[status];

  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default StatusBadge;
