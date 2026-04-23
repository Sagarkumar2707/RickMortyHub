import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CharacterStatus, CharacterGender } from '@types/api.types';
import { useAppDispatch, useAppSelector } from '@store/index';
import {
  setCharacterStatus,
  setCharacterGender,
  resetFilters,
} from '@store/slices/filtersSlice';
import { filterStyles as s } from './CharacterFilter.styles';

const STATUS_OPTIONS: Array<CharacterStatus | ''> = [
  '',
  'Alive',
  'Dead',
  'unknown',
];
const GENDER_OPTIONS: Array<CharacterGender | ''> = [
  '',
  'Male',
  'Female',
  'Genderless',
  'unknown',
];

const STATUS_COLORS: Record<string, string> = {
  Alive: '#4ADE80',
  Dead: '#EF4444',
  unknown: '#9CA3AF',
};

interface FilterChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
  colStyle: object;
  dotColor?: string;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active,
  onPress,
  colStyle,
  dotColor,
}) => (
  <TouchableOpacity
    style={[s.chip, colStyle, active && s.chipActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    {dotColor && <View style={[s.dot, { backgroundColor: dotColor }]} />}
    <Text style={[s.chipText, active && s.chipTextActive]}>{label}</Text>
  </TouchableOpacity>
);

interface CharacterFilterProps {
  isVisible: boolean;
  onClose: () => void;
}

const CharacterFilter: React.FC<CharacterFilterProps> = ({
  isVisible,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { characterStatus, characterGender } = useAppSelector(
    state => state.filters,
  );
  const [localStatus, setLocalStatus] = useState<CharacterStatus | ''>(
    characterStatus,
  );
  const [localGender, setLocalGender] = useState<CharacterGender | ''>(
    characterGender,
  );

  // Sync local state when modal opens
  React.useEffect(() => {
    if (isVisible) {
      setLocalStatus(characterStatus);
      setLocalGender(characterGender);
    }
  }, [isVisible, characterStatus, characterGender]);

  const handleApply = useCallback(() => {
    dispatch(setCharacterStatus(localStatus));
    dispatch(setCharacterGender(localGender));
    onClose();
  }, [dispatch, localStatus, localGender, onClose]);

  const handleReset = useCallback(() => {
    setLocalStatus('');
    setLocalGender('');
    dispatch(resetFilters());
  }, [dispatch]);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={s.modalOverlay}>
        <Pressable style={s.backdrop} onPress={onClose} />
        <View style={s.bottomSheet}>
          <View style={s.handleContainer}>
            <View style={s.handleBar} />
          </View>
          <View style={s.header}>
            <Text style={s.title}>FILTER CHARACTERS</Text>
            <TouchableOpacity style={s.closeButton} onPress={onClose}>
              <Text style={s.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={s.content}>
            <Text style={s.sectionTitle}>STATUS</Text>
            <View style={s.grid2}>
              {STATUS_OPTIONS.map(status => (
                <FilterChip
                  key={status || 'all-status'}
                  label={status === '' ? 'ALL' : status.toUpperCase()}
                  active={localStatus === status}
                  onPress={() => setLocalStatus(status)}
                  colStyle={s.chip2Col}
                  dotColor={status !== '' ? STATUS_COLORS[status] : undefined}
                />
              ))}
            </View>

            <Text style={s.sectionTitle}>GENDER</Text>
            <View style={s.grid}>
              <View style={s.gridRow}>
                {GENDER_OPTIONS.slice(0, 3).map(gender => (
                  <FilterChip
                    key={gender || 'all-gender'}
                    label={gender === '' ? 'ALL' : gender.toUpperCase()}
                    active={localGender === gender}
                    onPress={() => setLocalGender(gender)}
                    colStyle={s.chip3Col}
                  />
                ))}
              </View>
              <View style={s.gridRow}>
                {GENDER_OPTIONS.slice(3).map(gender => (
                  <FilterChip
                    key={gender}
                    label={gender.toUpperCase()}
                    active={localGender === gender}
                    onPress={() => setLocalGender(gender)}
                    colStyle={s.chip2Col}
                  />
                ))}
              </View>
            </View>
          </View>

          <SafeAreaView>
            <View style={s.footer}>
              <TouchableOpacity style={s.applyButton} onPress={handleApply}>
                <View style={s.checkCircle}>
                  <Text style={s.checkIcon}>✓</Text>
                </View>
                <Text style={s.applyText}>APPLY FILTERS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.resetButton} onPress={handleReset}>
                <Text style={s.resetText}>RESET TO DEFAULTS</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(CharacterFilter);
