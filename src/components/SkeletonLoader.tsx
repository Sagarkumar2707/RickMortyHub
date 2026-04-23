import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Colors } from '@constants/colors';

interface SkeletonLoaderProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Animated skeleton loader component.
 * Shows a pulsing placeholder while data is loading.
 * Uses React Native Animated API for the pulse effect.
 *
 * @param width - Width of the skeleton block
 * @param height - Height of the skeleton block
 * @param borderRadius - Optional border radius (default: 8)
 * @param style - Optional additional styles
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width,
  height,
  borderRadius = 8,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

/**
 * Skeleton card for character list items.
 * Matches the layout of the CharacterCard component.
 */
export const CharacterCardSkeleton: React.FC = () => (
  <View style={styles.cardContainer}>
    <SkeletonLoader width={100} height={100} borderRadius={12} />
    <View style={styles.cardContent}>
      <SkeletonLoader width="70%" height={18} borderRadius={4} />
      <SkeletonLoader
        width="40%"
        height={14}
        borderRadius={4}
        style={styles.skeletonSpacing}
      />
      <SkeletonLoader
        width="60%"
        height={14}
        borderRadius={4}
        style={styles.skeletonSpacing}
      />
      <SkeletonLoader
        width="50%"
        height={14}
        borderRadius={4}
        style={styles.skeletonSpacing}
      />
    </View>
  </View>
);

/**
 * Skeleton row for episode and location list items.
 */
export const ListItemSkeleton: React.FC = () => (
  <View style={styles.listItemContainer}>
    <View style={styles.listItemContent}>
      <SkeletonLoader width="60%" height={18} borderRadius={4} />
      <SkeletonLoader
        width="40%"
        height={14}
        borderRadius={4}
        style={styles.skeletonSpacing}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.border,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
    gap: 8,
  },
  skeletonSpacing: {
    marginTop: 8,
  },
  listItemContainer: {
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
  },
  listItemContent: {
    gap: 8,
  },
});

export default SkeletonLoader;
