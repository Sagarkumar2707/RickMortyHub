import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

/**
 * Return type of the useNetworkStatus hook
 */
interface UseNetworkStatusReturn {
  isConnected: boolean;
  isInternetReachable: boolean;
}

/**
 * Custom hook to monitor the device network connection status.
 * Subscribes to NetInfo events and updates state on change.
 *
 * @returns isConnected and isInternetReachable booleans
 *
 * @example
 * const { isConnected } = useNetworkStatus();
 */
const useNetworkStatus = (): UseNetworkStatusReturn => {
  const [networkState, setNetworkState] = useState<UseNetworkStatusReturn>({
    isConnected: true,
    isInternetReachable: true,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setNetworkState({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable ?? false,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkState;
};

export default useNetworkStatus;
