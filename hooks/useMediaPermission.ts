import { useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

export function useMediaPermisiion() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (!permissionResponse || permissionResponse.status !== 'granted') {
      requestPermission();
    }
  }, [permissionResponse]);

  if (permissionResponse) {
    return permissionResponse.status === 'granted';
  }
}
