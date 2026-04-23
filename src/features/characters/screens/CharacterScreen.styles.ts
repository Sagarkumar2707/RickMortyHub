import { StyleSheet } from 'react-native';
import { Colors } from '@constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  header: {
    backgroundColor: Colors.bgPrimary,
    paddingTop: 52,
    paddingBottom: 8,
  },
  headerTop: {
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: Colors.textPrimary, // White text
    textShadowColor: Colors.neonCyanMuted, // Cyan glow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12, // Stronger glow
    marginBottom: 8,
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgOverlay,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: Colors.textInactive,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  filterButton: {
    width: 52,
    height: 52,
    backgroundColor: Colors.bgOverlay,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 32,
    paddingTop: 8,
  },
  footerLoader: {
    marginVertical: 16,
  },
});
