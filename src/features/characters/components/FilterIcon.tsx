import React from 'react';
import { View, StyleSheet } from 'react-native';

const FilterIcon = () => (
  <View style={styles.container}>
    {/* Top line */}
    <View style={styles.row}>
      <View style={[styles.line, { flex: 1 }]} />
      <View style={styles.tick} />
      <View style={[styles.line, { flex: 3 }]} />
    </View>
    {/* Middle line */}
    <View style={styles.row}>
      <View style={[styles.line, { flex: 3 }]} />
      <View style={styles.tick} />
      <View style={[styles.line, { flex: 1 }]} />
    </View>
    {/* Bottom line */}
    <View style={styles.row}>
      <View style={[styles.line, { flex: 1 }]} />
      <View style={styles.tick} />
      <View style={[styles.line, { flex: 2 }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    height: 2,
    backgroundColor: '#00E5FF', // Cyan
  },
  tick: {
    width: 3,
    height: 8,
    backgroundColor: '#00E5FF',
    borderRadius: 1.5,
    marginHorizontal: 2,
  },
});

export default FilterIcon;
