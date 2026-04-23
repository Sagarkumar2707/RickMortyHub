export const Colors = {
  //  Backgrounds
  bgPrimary: '#1A1A2E',
  bgSecondary: '#111827',
  bgCard: '#0F172A',
  bgDeep: '#0B1221',
  bgAlt: '#16213E',
  bgOverlay: '#161B22',
  bgDark: '#1F2937',
  bgChip: '#1E293B',

  //  Borders & Dividers
  border: '#1E3A8A',
  borderLight: '#1E4D8C',
  borderTeal: '#164E63',
  borderAccent: '#0F3460',

  // Accent / Brand
  neonCyan: '#00E5FF',
  neonCyanMuted: '#00B5CC',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textDisabled: '#6B7280',
  textInactive: '#4B5563',
  textSubtle: '#374151',
  textLight: '#D1D5DB',

  // Status Colors
  statusAlive: '#4ADE80',
  statusDead: '#EF4444',
  statusSuccess: '#10B981',

  //  Utility
  black: '#000000',
  blackShort: '#000',
  white: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof Colors;
