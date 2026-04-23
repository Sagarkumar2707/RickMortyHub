import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@constants/colors';
import SkeletonLoader from './SkeletonLoader';

// Full-page skeleton for CharacterDetailScreen
// ... (rest of component)
const CharacterDetailSkeleton: React.FC = () => (
  <View style={s.container}>
    <View style={s.topBar}>
      <SkeletonLoader width={44} height={32} borderRadius={8} />
      <SkeletonLoader width={120} height={16} borderRadius={4} />
      <SkeletonLoader width={44} height={32} borderRadius={8} />
    </View>
    <View style={s.scroll}>
      <SkeletonLoader width={220} height={220} borderRadius={110} style={s.avatar} />
      <SkeletonLoader width={200} height={20} borderRadius={4} style={s.row} />
      <View style={s.pills}>
        <SkeletonLoader width={90} height={34} borderRadius={20} />
        <SkeletonLoader width={90} height={34} borderRadius={20} />
      </View>
      <SkeletonLoader width={140} height={16} borderRadius={4} style={s.sectionTitle} />
      {[1, 2, 3, 4, 5].map(i => (
        <View key={i} style={s.infoRow}>
          <SkeletonLoader width={80} height={14} borderRadius={4} />
          <SkeletonLoader width={120} height={14} borderRadius={4} />
        </View>
      ))}
      <SkeletonLoader width={140} height={16} borderRadius={4} style={s.sectionTitle} />
      <View style={s.chips}>
        {[1, 2, 3, 4].map(i => (
          <SkeletonLoader key={i} width={60} height={32} borderRadius={16} />
        ))}
      </View>
    </View>
  </View>
);

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDeep },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 52,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  scroll: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 32 },
  avatar: { marginBottom: 24 },
  row: { marginBottom: 16 },
  pills: { flexDirection: 'row', gap: 12, marginBottom: 40 },
  sectionTitle: { alignSelf: 'flex-start', marginBottom: 12 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bgDarker,
  },
  chips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 4 },
});

export default CharacterDetailSkeleton;
