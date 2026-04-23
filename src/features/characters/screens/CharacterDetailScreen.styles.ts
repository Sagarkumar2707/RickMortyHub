import { StyleSheet } from 'react-native';
import { Colors } from '@constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep, // Deep dark navy
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgDeep,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 52,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.bgDeep,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
    width: 44, // give fixed width to help center the title
  },
  backIcon: {
    color: Colors.neonCyan,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: Colors.neonCyan,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  favouriteButton: {
    padding: 8,
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  heartIcon: {
    fontSize: 26,
    color: Colors.textInactive,
    fontWeight: 'bold',
  },
  heartIconActive: {
    color: Colors.neonCyan,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 24,
    shadowColor: Colors.neonCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 20,
    borderRadius: 110,
    backgroundColor: Colors.blackShort,
  },
  avatar: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 4,
    borderColor: Colors.neonCyan,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neonCyan,
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40,
  },
  pill: {
    backgroundColor: Colors.bgSecondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  speciesText: {
    color: Colors.neonCyan,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  infoGrid: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  infoValue: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    maxWidth: '60%',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textSecondary,
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  episodesFlatList: {
    alignSelf: 'stretch',
  },
  episodesList: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    gap: 8,
  },
});
