import { View, Text } from "react-native";

import Button from "../Button.js";
import style from "../../style.js";

export default (props) => {
  return (
    <View style={style.prompt}>
      <Text style={style.promptText}>Add New Item</Text>
      <View style={style.buttonRow}>
        <Button text="Add" style={{ flex: 1 }}></Button>
        <Button text="Cancel" style={{ flex: 1 }}></Button>
      </View>
    </View>
  );
};
