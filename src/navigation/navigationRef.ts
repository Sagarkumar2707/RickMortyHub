import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@types/api.types';

/**
 * Navigation ref for navigating outside of React components.
 * Useful for navigating from Redux thunks or utility functions.
 */
export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();

/**
 * Navigate to any screen from outside a component.
 * @param name - Screen name
 * @param params - Screen params
 */
export const navigate = <RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params: RootStackParamList[RouteName],
): void => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
