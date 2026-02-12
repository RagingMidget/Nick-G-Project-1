import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, Alert, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "./components/ListItem.js";
import Button from "./components/Button.js";
import style from "./style.js";
import Modal from "./components/Modal.js";
import DeleteItem from "./components/prompts/DeleteItem.js";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import AddItem from "./components/prompts/AddItem.js";
import AppInfo from "./components/prompts/AppInfo.js";

const APP_NAME = `Contacts`;
const AUTHOR = "Nick Gregory";
const CUSTOM_FONT = "Birthstone-Regular";

const COLOR_BACKGROUND = "#fcfdff";
const COLOR_BORDER = "#272c35";
const COLOR_TEXT = "#e60645";

const APP_INFO = `${AUTHOR}

Font: ${CUSTOM_FONT}

Background: ${COLOR_BACKGROUND}
Border: ${COLOR_BORDER}
Text: ${COLOR_TEXT}`;

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
  // New variable to track which item to delete
  let [selectedItem, setSelectedItem] = useState();
  let [editText, setEditText] = useState("");

  let clearList = () => setListItems([]);

  function addItemToList(text) {
    if (text === "") return;
    let newItem = { text, id: nextID };
    setNextID(nextID + 1);
    setListItems([...listItems, newItem]);
    closeModal();
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

  //  let [newItemText, setNewItemText] = useState("");
  //  function onTextChanged(text) {
  //    setNewItemText(text);
  //  }

  const confirmDeleteAll = () =>
    Alert.alert(
      "Delete All Items",
      "Are you sure you want to delete all items?",
      [{ text: "Yes", onPress: clearList }, { text: "No" }],
    );

  const promptDeleteItem = (idToRemove) => {
    let item = listItems.find((i) => i.id === idToRemove);
    if (!item) return;
    setSelectedItem(item);
    setModalContentKey("delete-item"); // New
    openModal();
  };

  const promptEditItem = (item) => {
    setSelectedItem(item);
    setEditText(item.text);
    setModalContentKey("edit-item");
    openModal();
  };

  const promptAppInfo = () => {
    setModalContentKey("app-info");
    openModal();
  };

  // Need the function to open the modal
  const promptAddItem = () => {
    setModalContentKey("add-item");
    openModal();
  };

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContentKey, setModalContentKey] = useState();
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={style.app}>
      <StatusBar style="auto" />
      <Pressable onPress={promptAppInfo}>
        <Text style={style.header}>{APP_NAME}</Text>
      </Pressable>
      <ListItem
        items={listItems}
        deleteItemCallback={promptDeleteItem}
        editItemCallback={promptEditItem}
      ></ListItem>

      <View style={style.buttonRow}>
        <Button
          icon={{ name: "trash-outline", size: 32 }}
          style={{ flex: 1 }}
          onPress={confirmDeleteAll}
        ></Button>
        <Button
          icon={{ name: "add-outline", size: 32 }}
          style={{ flex: 3 }}
          onPress={promptAddItem}
        ></Button>
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
        content={
          {
            "app-info": <AppInfo text={APP_INFO} ok={closeModal} />,

            "add-item": (
              <AddItem
                add={(text) => addItemToList(text)}
                cancel={closeModal}
              />
            ),

            "delete-item": (
              <DeleteItem
                itemText={selectedItem?.text}
                yes={() => {
                  removeItemFromList(selectedItem.id);
                  closeModal();
                }}
                no={closeModal}
              />
            ),
            "edit-item": (
              <AddItem
                title="Edit Item"
                add={(newText) => {
                  let updated = listItems.map((i) =>
                    i.id === selectedItem.id ? { ...i, text: newText } : i,
                  );
                  setListItems(updated);
                  closeModal();
                }}
                cancel={closeModal}
              />
            ),
          }[modalContentKey]
        }
      ></Modal>
    </SafeAreaView>
  );
}

export default App;
