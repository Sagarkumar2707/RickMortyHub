import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Location } from '@types/api.types';
import { Colors } from '@constants/colors';

interface LocationCardProps {
  location: Location;
  onPress: (location: Location) => void;
}

/**
 * Location card component with spring press animation.
 * Shows location name, type, dimension and resident count.
 *
 * @param location - The Location object to display
 * @param onPress - Callback when card is pressed
 */
const LocationCard: React.FC<LocationCardProps> = ({ location, onPress }) => {
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
    onPress(location);
  }, [location, onPress]);

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
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{location.type.toUpperCase()}</Text>
          </View>
          <Text style={styles.worldIcon}>🌍</Text>
        </View>

        {/* Middle Content */}
        <View style={styles.middleContent}>
          <Text style={styles.name} numberOfLines={1}>
            {location.name}
          </Text>
          <View style={styles.dimensionRow}>
            <Text style={styles.dimensionIcon}>🌀</Text>
            <Text style={styles.dimensionText}>
              {location.dimension || 'Unknown Dimension'}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bottom Row */}
        <View style={styles.bottomRow}>
          <Text style={styles.residentsText}>
            {location.residents.length} RESIDENTS
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
  typeBadge: {
    backgroundColor: 'rgba(0, 181, 204, 0.1)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.neonCyanMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  typeText: {
    color: Colors.neonCyan,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  worldIcon: {
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
  dimensionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dimensionIcon: {
    fontSize: 14,
    opacity: 0.7,
  },
  dimensionText: {
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  residentsText: {
    color: Colors.neonCyan,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
});

export default React.memo(LocationCard);
