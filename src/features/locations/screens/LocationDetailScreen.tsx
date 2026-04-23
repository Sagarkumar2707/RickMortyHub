import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { RootStackParamList, Character } from '@types/api.types';
import { ErrorScreen } from '@components/index';
import { fetchCharactersByIds } from '@api/axiosInstance';
import useLocationDetail from '../hooks/useLocationDetail';
import { extractResidentIds } from '../utils/locationUtils';
import { styles } from './LocationDetailScreen.styles';

type LocationDetailRouteProp = RouteProp<RootStackParamList, 'LocationDetail'>;

/**
 * Location detail screen.
 * Shows location info (name, type, dimension)
 * and a grid of resident character avatars
 * with lazy loaded images.
 */
const LocationDetailScreen: React.FC = () => {
  const route = useRoute<LocationDetailRouteProp>();
  const navigation = useNavigation();
  const { locationId } = route.params;

  const {
    data: location,
    isLoading,
    isError,
    error,
    refetch,
  } = useLocationDetail(locationId);

  const residentIds = useMemo(
    () => extractResidentIds(location?.residents ?? []),
    [location],
  );

  const { data: residents, isLoading: isLoadingResidents } = useQuery<
    Character[],
    Error
  >({
    queryKey: ['locationResidents', locationId],
    queryFn: () => fetchCharactersByIds(residentIds),
    enabled: residentIds.length > 0,
    staleTime: 10 * 60 * 1000,
  });

  const renderResident = useCallback(
    ({ item }: { item: Character }) => (
      <View style={styles.residentItem}>
        <View style={styles.avatarContainer}>
          <FastImage
            style={styles.residentAvatar}
            source={{
              uri: item.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <Text style={styles.residentName} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: Character) => `resident-${item.id}`,
    [],
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00B5CC" />
      </View>
    );
  }

  if (isError || !location) {
    return <ErrorScreen message={error?.message} onRetry={() => refetch()} />;
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Location Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🌍</Text>
        </View>

        {/* Location Name */}
        <Text style={styles.name}>{location.name}</Text>

        {/* Info Cards */}
        <View style={styles.infoGrid}>
          <InfoRow label="Type" value={location.type || 'Unknown'} />
          <InfoRow label="Dimension" value={location.dimension || 'Unknown'} />
          <InfoRow
            label="Residents"
            value={`${location.residents.length} characters`}
          />
        </View>

        {/* Residents Section */}
        <Text style={styles.sectionTitle}>
          Residents [{location.residents.length}]
        </Text>

        {location.residents.length === 0 ? (
          <Text style={styles.noResidents}>
            No known residents in this location.
          </Text>
        ) : isLoadingResidents ? (
          <ActivityIndicator
            size="large"
            color="#00B5CC"
            style={styles.residentsLoader}
          />
        ) : (
          <FlatList
            data={residents ?? []}
            renderItem={renderResident}
            keyExtractor={keyExtractor}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.residentsGrid}
          />
        )}
      </ScrollView>
    </View>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

/**
 * Reusable label-value info row for location details.
 *
 * @param label - The field label
 * @param value - The field value
 */
const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export default LocationDetailScreen;
