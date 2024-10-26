import React, { useEffect, useRef, useState } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { VideoView, useVideoPlayer } from 'expo-video';

const source = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export default function MediaPlayer({ mediaSrc = source, isPlayerVisible, setIsPlayerVisible }:
  { mediaSrc?: string, isPlayerVisible: boolean, setIsPlayerVisible: (isPlayerVisible: boolean) => void }) {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const player = useVideoPlayer(mediaSrc, player => {
    player.loop = true;
    player.pause();
  });

  useEffect(() => {
    const subscription = player.addListener('playingChange', (isPlaying: boolean | any) => {
      setIsPlaying(isPlaying ?? false);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  return (
    <Modal
      animationType="slide"
      visible={isPlayerVisible}
      hardwareAccelerated
      onRequestClose={() => {
        player.pause();
        setIsPlaying(false);
        setIsPlayerVisible(false);
      }}
    >
      <View style={styles.contentContainer}>
        <VideoView
          ref={playerRef}
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      </View>
    </Modal >
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#000000"
  },
  video: {
    width: 350,
    height: 275,
  },
});
