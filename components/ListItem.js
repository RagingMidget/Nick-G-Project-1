import { View, Text, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import style from "../style.js";

export default (props) => {
  let renderFunction = ({ item }) => {
    return (
      <View
        style={[
          style.listItem,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        {/* EDIT ON TEXT PRESS */}
        <Pressable onPress={() => props.editItemCallback(item)}>
          <Text style={style.listItemText}>{item.text}</Text>
        </Pressable>

        {/* DELETE ICON */}
        <Pressable onPress={() => props.deleteItemCallback(item.id)}>
          <Ionicons name="close" size={24} style={style.icon} />
        </Pressable>
      </View>
    );
  };

  return (
    <FlatList
      style={style.list}
      data={props.items}
      renderItem={renderFunction}
    />
  );
};
