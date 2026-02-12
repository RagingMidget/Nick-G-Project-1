import { View, Text } from "react-native";
import Button from "../Button.js";
import style from "../../style.js";

export default (props) => {
  return (
    <View style={style.prompt}>
      <Text style={style.promptText}>App Info</Text>

      <Text style={style.infoText}>{props.text}</Text>

      <View style={style.buttonRow}>
        <Button
          text="OK"
          onPress={props.ok}
          icon={{ name: "checkmark", size: 32 }}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};
