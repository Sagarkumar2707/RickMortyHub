import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabParamList } from '@types/api.types';
import { useAppDispatch } from '@store/index';
import { setActiveTab } from '@store/slices/filtersSlice';
import { Colors } from '@constants/colors';

// Screens
import CharactersScreen from '@features/characters/screens/CharactersScreen';
import EpisodesScreen from '@features/episodes/screens/EpisodesScreen';
import LocationsScreen from '@features/locations/screens/LocationsScreen';
import { FavouritesScreen } from '@features/favourites';
import { PeopleIcon, TvIcon, GlobeIcon, HeartIcon } from './TabIcons';

const Tab = createBottomTabNavigator<BottomTabParamList>();

/**
 * Bottom tab navigator.
 * Dispatches active tab to Redux on tab press.
 * Contains Characters, Episodes, Locations and Favourites tabs.
 */
const BottomTabNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  // On Android, add the system nav bar height so the tab bar is never hidden behind it
  const tabBarPaddingBottom = Platform.OS === 'android'
    ? Math.max(insets.bottom, 8)
    : insets.bottom + 8;

  const tabBarHeight = Platform.OS === 'ios' ? 85 : 60 + tabBarPaddingBottom;

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: Colors.bgPrimary }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, { height: tabBarHeight, paddingBottom: tabBarPaddingBottom }],
        tabBarActiveTintColor: Colors.neonCyan,
        tabBarInactiveTintColor: Colors.textInactive,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        tabBarBackground: () => (
          <View style={styles.tabBarBackground} />
        ),
      }}
    >
      <Tab.Screen
        name="Characters"
        component={CharactersScreen}
        listeners={{
          tabPress: () => dispatch(setActiveTab('characters')),
        }}
        options={{
          tabBarLabel: 'Characters',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : null}>
              <PeopleIcon color={color} focused={focused} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Episodes"
        component={EpisodesScreen}
        listeners={{
          tabPress: () => dispatch(setActiveTab('episodes')),
        }}
        options={{
          tabBarLabel: 'Episodes',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : null}>
              <TvIcon color={color} focused={focused} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Locations"
        component={LocationsScreen}
        listeners={{
          tabPress: () => dispatch(setActiveTab('locations')),
        }}
        options={{
          tabBarLabel: 'Locations',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : null}>
              <GlobeIcon color={color} focused={focused} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        listeners={{
          tabPress: () => dispatch(setActiveTab('favourites')),
        }}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : null}>
              <HeartIcon color={color} focused={focused} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.bgSecondary,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    elevation: 20,
    shadowColor: Colors.neonCyan,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: Colors.bgSecondary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    shadowColor: Colors.neonCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default BottomTabNavigator;
