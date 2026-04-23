import { StyleSheet } from 'react-native';
import { Colors } from '@constants/colors';

export const styles = StyleSheet.create({
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
    marginBottom: 2,
  },
  removeIcon: {
    fontSize: 22,
    color: Colors.neonCyan,
    fontWeight: 'bold',
    textShadowColor: Colors.neonCyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
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
  footer: {
    marginTop: 2,
  },
  savedDate: {
    fontSize: 9,
    color: Colors.neonCyan,
    fontWeight: '800',
    letterSpacing: 1,
  },
});

