import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import { FavouriteCharacter } from '@types/api.types';
import { StatusBadge } from '@components/index';
import { useAppDispatch } from '@store/index';
import { removeFavouriteThunk } from '@store/slices/favouritesSlice';
import { styles } from './FavouriteCard.styles';

interface FavouriteCardProps {
  character: FavouriteCharacter;
  onPress: (character: FavouriteCharacter) => void;
}

/**
 * Favourite character card component.
 * Horizontal layout with a glowing avatar and premium details.
 */
const FavouriteCard: React.FC<FavouriteCardProps> = ({
  character,
  onPress,
}) => {
  const dispatch = useAppDispatch();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, { damping: 15 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15 });
  }, [scale]);

  const handlePress = useCallback(() => {
    onPress(character);
  }, [character, onPress]);

  const handleRemove = useCallback(() => {
    const remove = () => {
      dispatch(removeFavouriteThunk(character.id));
    };

    Alert.alert(
      'Remove Favourite',
      `Remove ${character.name} from favourites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            opacity.value = withTiming(0, { duration: 300 }, () => {
              runOnJS(remove)();
            });
            scale.value = withTiming(0.8, { duration: 300 });
          },
        },
      ],
    );
  }, [character, dispatch, opacity, scale]);

  const savedDate = new Date(character.savedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Animated.View style={[styles.cardWrapper, animatedStyle]}>
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={handleRemove}
        delayLongPress={400}
        activeOpacity={1}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.glowBorder}>
            <FastImage
              style={styles.avatar}
              source={{
                uri: character.image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Name + Remove Icon */}
          <View style={styles.headerRow}>
            <Text style={styles.name} numberOfLines={1}>
              {character.name}
            </Text>
            <TouchableOpacity
              onPress={handleRemove}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.removeIcon}>{`\u2665\uFE0E`}</Text>
            </TouchableOpacity>
          </View>

          {/* Status + Species Pills */}
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
              {character.locationName}
            </Text>
          </View>

          {/* Saved Date */}
          <View style={styles.footer}>
            <Text style={styles.savedDate}>SAVED {savedDate.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default React.memo(FavouriteCard);
