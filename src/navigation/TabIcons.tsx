import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IconProps {
  color: string;
  focused: boolean;
}

export const PeopleIcon: React.FC<IconProps> = ({ color, focused }) => {
  const bgColor = focused ? color : 'transparent';
  const centerBgColor = focused ? color : '#111827';
  const strokeWidth = focused ? 0 : 2;

  return (
    <View style={s.peopleWrapper}>
      {/* Left person */}
      <View style={s.personLeft}>
        <View style={[s.headSm, { backgroundColor: bgColor, borderColor: color, borderWidth: strokeWidth }]} />
        <View style={[s.bodySm, { backgroundColor: bgColor, borderColor: color, borderWidth: strokeWidth, borderBottomWidth: 0 }]} />
      </View>
      {/* Right person */}
      <View style={s.personRight}>
        <View style={[s.headSm, { backgroundColor: bgColor, borderColor: color, borderWidth: strokeWidth }]} />
        <View style={[s.bodySm, { backgroundColor: bgColor, borderColor: color, borderWidth: strokeWidth, borderBottomWidth: 0 }]} />
      </View>
      {/* Center person */}
      <View style={s.personCenter}>
        <View style={[s.headLg, { backgroundColor: centerBgColor, borderColor: color, borderWidth: strokeWidth }]} />
        <View style={[s.bodyLg, { backgroundColor: centerBgColor, borderColor: color, borderWidth: strokeWidth, borderBottomWidth: 0 }]} />
      </View>
    </View>
  );
};

export const TvIcon: React.FC<IconProps> = ({ color, focused }) => (
  <View style={s.tvWrapper}>
    <View style={[s.tvScreen, { borderColor: color, backgroundColor: focused ? color : 'transparent' }]} />
    <View style={[s.tvStand1, { backgroundColor: color }]} />
    <View style={[s.tvStand2, { backgroundColor: color }]} />
  </View>
);

export const GlobeIcon: React.FC<IconProps> = ({ color, focused }) => {
  const innerColor = focused ? '#111827' : color;
  return (
    <View style={[s.globe, { borderColor: color, backgroundColor: focused ? color : 'transparent' }]}>
      <View style={[s.globeOval, { borderColor: innerColor }]} />
      <View style={[s.globeHLine, { backgroundColor: innerColor }]} />
      <View style={[s.globeVLine, { backgroundColor: innerColor }]} />
    </View>
  );
};

export const HeartIcon: React.FC<IconProps> = ({ color, focused }) => (
  <Text style={[s.heartText, { color }]}>
    {focused ? '\u2665\uFE0E' : '\u2661\uFE0E'}
  </Text>
);

const s = StyleSheet.create({
  // PeopleIcon
  peopleWrapper: {
    width: 32,
    height: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  personLeft: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    alignItems: 'center',
  },
  personRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  personCenter: {
    zIndex: 1,
    alignItems: 'center',
  },
  headSm: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 1,
  },
  bodySm: {
    width: 14,
    height: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  headLg: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 1,
  },
  bodyLg: {
    width: 18,
    height: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  // TvIcon
  tvWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tvScreen: {
    width: 22,
    height: 16,
    borderRadius: 4,
    borderWidth: 2,
  },
  tvStand1: {
    width: 8,
    height: 2,
  },
  tvStand2: {
    width: 12,
    height: 2,
  },
  // GlobeIcon
  globe: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  globeOval: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    transform: [{ scaleX: 0.4 }],
  },
  globeHLine: {
    position: 'absolute',
    width: 24,
    height: 1,
  },
  globeVLine: {
    position: 'absolute',
    width: 1,
    height: 24,
  },
  // HeartIcon
  heartText: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 'bold',
  },
});

