import { Pressable, StyleSheet, Text, View } from "react-native";
import Icons from '@expo/vector-icons/FontAwesome6';

export default function ListItem({ title, color, onPress }: { title: string, color: string, onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.listItem}>
        <Icons name="photo-film" size={32} color="lightgrey" />
        <Text style={{ color }}>{title}</Text>
      </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  }
});
