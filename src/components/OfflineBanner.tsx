import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNetworkStatus } from '@hooks/index';
import { Colors } from '@constants/colors';

/**
 * Animated offline banner that slides down from the top
 * when the device loses internet connection.
 * Accounts for safe area insets (notches/dynamic islands).
 */
const OfflineBanner: React.FC = () => {
  const { isConnected } = useNetworkStatus();
  const insets = useSafeAreaInsets();

  // Starting position is hidden above the safe area
  const bannerHeight = 40;
  const hiddenValue = -(bannerHeight + insets.top);
  const translateY = useRef(new Animated.Value(hiddenValue)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: isConnected ? hiddenValue : insets.top,
      useNativeDriver: true,
      tension: 40,
      friction: 8,
    }).start();
  }, [isConnected, translateY, insets.top, hiddenValue]);

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          transform: [{ translateY }],
          height: bannerHeight,
        },
      ]}
    >
      <Text style={styles.text}>📡 No internet connection</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.statusDead,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    // Add shadow/glow for premium feel
    shadowColor: Colors.statusDead,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  text: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

export default OfflineBanner;
