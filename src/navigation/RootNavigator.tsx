import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '@types/api.types';
import { Colors } from '@constants/colors';
import BottomTabNavigator from './BottomTabNavigator';

// Standard static imports for screens
import CharacterDetailScreen from '@features/characters/screens/CharacterDetailScreen';
import EpisodeDetailScreen from '@features/episodes/screens/EpisodeDetailScreen';
import LocationDetailScreen from '@features/locations/screens/LocationDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

/** Custom dark theme — overrides NavigationContainer background to app dark color */
const AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.bgPrimary,
    card: Colors.bgSecondary,
    border: Colors.border,
  },
};

/**
 * Root navigator of the app.
 * Contains the bottom tab navigator and all detail screens.
 */
const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: Colors.bgPrimary },
        }}>
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetailScreen}
        />
        <Stack.Screen
          name="EpisodeDetail"
          component={EpisodeDetailScreen}
        />
        <Stack.Screen
          name="LocationDetail"
          component={LocationDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgPrimary,
  },
});

export default RootNavigator;
