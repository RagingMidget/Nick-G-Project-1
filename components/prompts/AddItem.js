import { useState } from "react";
import { View, Text, TextInput } from "react-native";

import Button from "../Button.js";
import style from "../../style.js";

export default (props) => {
  let [text, setText] = useState("");
  return (
    <View style={style.prompt}>
      <Text style={style.promptText}>{props.title ?? "Add New Item"}</Text>
      <TextInput
        style={style.inputText}
        value={text}
        onChangeText={(newText) => setText(newText)}
      />
      <View style={style.buttonRow}>
        <Button
          text="Cancel"
          onPress={props.cancel}
          icon={{ name: "close", size: 32 }}
          style={{ flex: 1 }}
        ></Button>
        <Button
          text="Add"
          onPress={() => props.add(text)}
          icon={{ name: "checkmark", size: 32 }}
          style={{ flex: 2 }}
        ></Button>
      </View>
    </View>
  );
};
