import { StyleSheet } from 'react-native';
import { Colors } from '@constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgPrimary,
  },
  topBar: {
    paddingTop: 52,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.bgPrimary,
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  backText: {
    color: Colors.neonCyanMuted,
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  infoCard: {
    width: '100%',
    backgroundColor: Colors.bgAlt,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.borderAccent,
  },
  episodeBadge: {
    backgroundColor: 'rgba(0, 181, 204, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 181, 204, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
  },
  episodeCode: {
    color: Colors.neonCyanMuted,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  airDate: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  loadingCharsContainer: {
    flex: 1,
  },
  charsLoader: {
    marginTop: 32,
  },
  characterItem: {
    width: '33.33%',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    shadowColor: Colors.neonCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 45,
    backgroundColor: Colors.blackShort,
    marginBottom: 8,
  },
  characterAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: Colors.neonCyan,
  },
  characterName: {
    color: Colors.textLight,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  skeletonItem: {
    width: '33.33%',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  skeletonName: {
    marginTop: 8,
  },
});
