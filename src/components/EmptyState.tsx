import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Colors } from '@constants/colors';

interface EmptyStateProps {
  title?: string;
  message?: string;
  emoji?: string;
}

/**
 * Empty state component shown when a list returns no results.
 * Displays a friendly illustration with a title and message.
 *
 * @param title - Optional heading text
 * @param message - Optional subtext message
 * @param emoji - Optional emoji illustration (default: 🔍)
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Results Found',
  message = 'Try adjusting your search or filters.',
  emoji = '🔍',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 60,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default EmptyState;
