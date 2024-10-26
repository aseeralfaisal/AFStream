import { useState } from 'react';
import { FlatList, StyleSheet, View, useColorScheme } from 'react-native';
import { useMediaAssets } from '@/hooks/useMediaAssets';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import ListItem from '@/components/ui/ListItem';
import MediaPlayer from '@/components/ui/MediaPlayer';

export default function Dashboard() {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const colorScheme = useColorScheme();
  const mediaAssets = useMediaAssets();
  const isDarkMode = colorScheme === 'dark';
  const [mediaSrc, setMediaSrc] = useState<any>(null);

  const { text, background } = isDarkMode ? Colors.dark : Colors.light;

  const renderItem = ({ item }: { item: { id: string, filename?: string, uri?: string } }) => {
    return (
      <ListItem title={item.filename || "Untitled"}
        color={text}
        onPress={() => {
          setIsPlayerVisible(true);
          setMediaSrc(item.uri);
        }}
      />
    )
  };

  return (
    <>
      <MediaPlayer mediaSrc={mediaSrc} isPlayerVisible={isPlayerVisible} setIsPlayerVisible={setIsPlayerVisible} />
      <View style={{ ...styles.mainContainer, backgroundColor: background }}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={mediaAssets}
          renderItem={renderItem}
        />
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingHorizontal: 10
  },
});

