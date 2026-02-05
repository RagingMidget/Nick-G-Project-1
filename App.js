import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "./components/ListItem.js";
import Button from "./components/Button.js";

import style from "./style.js";

import { useFonts } from "expo-font";
import { useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";

// Call before Component Function
SplashScreen.preventAutoHideAsync();

function App() {
  const [loaded, error] = useFonts({
    "Birthstone-Regular": require("./assets/fonts/Birthstone-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  let [nextID, setNextID] = useState(1);
  let [listItems, setListItems] = useState([]);

  let clearList = () => setListItems([]);

  function addItemToList() {
    if (newItemText === "") return;
    let newItem = { text: newItemText, id: nextID };
    setNextID(nextID + 1);
    setListItems([...listItems, newItem]);
    setNewItemText("");
  }

  function removeItemFromList(idToRemove) {
    let arrayWithRemovedItem = [];
    listItems.forEach((item) => {
      if (item.id != idToRemove) {
        arrayWithRemovedItem.push(item);
      }
    });
    setListItems(arrayWithRemovedItem);
  }

  let [newItemText, setNewItemText] = useState("");
  function onTextChanged(text) {
    setNewItemText(text);
  }

  return (
    <SafeAreaView style={style.app}>
      <StatusBar style="auto" />
      <Text style={style.header}> Nick Gregory Lab 2 </Text>
      <ListItem
        items={listItems}
        deleteItemCallback={removeItemFromList}
      ></ListItem>
      <TextInput
        style={style.inputText}
        value={newItemText}
        onChangeText={onTextChanged}
      ></TextInput>
      <Button
        text="ADD ITEM"
        onPress={addItemToList}
        style={{ backgroundColor: "blue" }}
      ></Button>
      <Button text="CLEAR LIST" onPress={clearList}></Button>
    </SafeAreaView>
  );
}

export default App;
