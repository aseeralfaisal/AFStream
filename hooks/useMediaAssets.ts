import React, { useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import { useMediaPermisiion } from "./useMediaPermission";

export function useMediaAssets() {
  const mediaPermission = useMediaPermisiion();
  const [mediaAssets, setMediaAssets] = React.useState<any[]>([]);

  async function getAssets() {
    const localAssets = await MediaLibrary.getAssetsAsync({ mediaType: MediaLibrary.MediaType.video });
    const assets = localAssets && localAssets.assets;

    if (localAssets && assets) {
      setMediaAssets(assets);
    }
  }

  useEffect(() => {
    if (mediaPermission) {
      getAssets();
    }
  }, [mediaPermission])

  return mediaAssets;
}
