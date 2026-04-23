import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import { Character } from '@types/api.types';
import { StatusBadge } from '@components/index';
import { Colors } from '@constants/colors';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

interface CharacterCardProps {
  character: Character;
  onPress: (character: Character) => void;
}

/**
 * Animated character card component.
 * Premium horizontal layout with glowing circular avatar.
 * Mirrors FavouriteCard design without the heart icon and saved footer.
 *
 * @param character - The Character object to display
 * @param onPress - Callback when card is pressed
 */
const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.5);
  const shadowRadius = useSharedValue(10);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    shadowOpacity: shadowOpacity.value,
    shadowRadius: shadowRadius.value,
    elevation: shadowOpacity.value * 20,
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, { damping: 15 });
    shadowOpacity.value = withSpring(0.8, { damping: 15 });
    shadowRadius.value = withSpring(20, { damping: 15 });
  }, [scale, shadowOpacity, shadowRadius]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15 });
    shadowOpacity.value = withSpring(0.5, { damping: 15 });
    shadowRadius.value = withSpring(10, { damping: 15 });
  }, [scale, shadowOpacity, shadowRadius]);

  const handlePress = useCallback(() => {
    onPress(character);
  }, [character, onPress]);

  return (
    <Animated.View style={[styles.cardWrapper, animatedStyle]}>
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Animated.View style={[styles.glowBorder, animatedGlowStyle]}>
            <AnimatedFastImage
              style={styles.avatar}
              source={{
                uri: character.image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
              sharedTransitionTag={`character-image-${character.id}`}
            />
          </Animated.View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {character.name}
          </Text>

          {/* Status + Species Row */}
          <View style={styles.metaRow}>
            <View style={styles.statusPill}>
              <StatusBadge status={character.status} />
            </View>
            <View style={styles.speciesPill}>
              <Text style={styles.speciesText} numberOfLines={1}>
                {character.species.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {character.location.name}
            </Text>
          </View>
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
    flexDirection: 'row',
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    alignItems: 'center',
  },
  avatarSection: {
    marginRight: 16,
  },
  glowBorder: {
    width: 100,
    height: 100,
    backgroundColor: Colors.blackShort,
    shadowColor: Colors.neonCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 2,
    borderColor: Colors.neonCyan,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    gap: 6,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  statusPill: {
    backgroundColor: Colors.bgSecondary,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.bgDark,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  speciesPill: {
    backgroundColor: Colors.bgSecondary,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.borderTeal,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  speciesText: {
    fontSize: 11,
    color: Colors.neonCyan,
    fontWeight: '700',
    letterSpacing: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationIcon: {
    fontSize: 11,
  },
  locationText: {
    fontSize: 11,
    color: Colors.textDisabled,
    fontWeight: '500',
    flex: 1,
  },
});

export default React.memo(CharacterCard);
