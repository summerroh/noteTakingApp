import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../config/colors";
import Screen from "../components/Screen";
import DropDown from "../components/DropDown";
import { clients, categories } from "../data/data";

function NoteDetailScreen({ route, navigation }) {
  // get the previous values of the note
  const { id, client, category, title, note } = route.params || {};

  const [titleValue, setTitleValue] = useState(title);
  const [noteValue, setNoteValue] = useState(note);
  // Values for React-native-dropdown-picker
  const [clientValue, setClientValue] = useState(client);
  const [categoryValue, setCategoryValue] = useState(category);

  // storeData
  const storeData = async () => {
    // if there is no title and note, show user Alert
    if (!title.trim() && !note.trim()) {
      Alert.alert(
        "Please write the title or note to save the note!",
        "",
        [
          {
            text: "Got it",
          },
        ],
        {
          cancelable: true,
        }
      );
      return;
    }
    let value = {
      id: id,
      client: clientValue,
      category: categoryValue,
      title: titleValue,
      note: noteValue,
    };

    try {
      // update note data to AsyncStorage
      let noteData = [];
      const result = await AsyncStorage.getItem("notes");
      if (result) {
        noteData = JSON.parse(result);
      }
      // update the note without changing the index of it
      let tempNote = noteData.map((note) => {
        if (note.id === id) {
          note = value;
          return note;
        } else {
          return note;
        }
      });
      await AsyncStorage.setItem("notes", JSON.stringify(tempNote));
      navigation.navigate("MainScreen", { noteSaved: true });
    } catch (e) {}
  };

  // Double check with the user if they want to delete the note
  const confirmDelete = () => {
    Alert.alert(
      "Are you sure to delete this note?",
      "",
      [
        {
          text: "Yes",
          onPress: deleteData,
        },
        {
          text: "No",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  // Delete the note
  const deleteData = async () => {
    let noteData = [];
    const result = await AsyncStorage.getItem("notes");
    if (result) {
      noteData = JSON.parse(result);
    }
    try {
      // remove this note from existing notesData
      let tempNote = noteData.filter((note) => note.id !== id);
      await AsyncStorage.setItem("notes", JSON.stringify(tempNote));
      navigation.navigate("MainScreen", { noteDeleted: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Feather
            name="chevron-left"
            size={28}
            color="black"
            onPress={() => navigation.goBack({ noteSaved: false })}
          />
          <View style={styles.iconContainer}>
            <Feather
              name="save"
              size={26}
              color={colors.blue}
              onPress={() => storeData()}
            />
            <Feather
              name="trash-2"
              size={26}
              color={colors.red}
              style={styles.trash}
              onPress={() => confirmDelete()}
            />
          </View>
        </View>
        <View style={styles.contents}>
          <View style={styles.dropDownContainer}>
            {/* Client Dropdown */}
            <Text style={styles.subTitle}>Client</Text>

            <DropDown
              itemType={clients}
              value={clientValue}
              setValue={setClientValue}
              placeholderText={"Select a Client"}
              zIndex={100}
            />

            {/* Category Dropdown */}
            <Text style={[styles.subTitle, { marginTop: 30 }]}>Category</Text>

            <DropDown
              itemType={categories}
              value={categoryValue}
              setValue={setCategoryValue}
              placeholderText={"Select a category"}
              zIndex={50}
            />
          </View>
          {/* Title and note*/}
          <TextInput
            style={styles.title}
            multiline={true}
            onChangeText={(newText) => setTitleValue(newText)}
            defaultValue={title}
            placeholder={"Title"}
          ></TextInput>
          <TextInput
            style={styles.note}
            multiline={true}
            onChangeText={(newText) => setNoteValue(newText)}
            defaultValue={note}
            placeholder={"Write a note here!"}
          ></TextInput>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  contents: {
    flex: 1,
    backgroundColor: colors.lightGrey,
    paddingHorizontal: 30,
  },
  dropDownContainer: {
    paddingVertical: 40,
    // backgroundColor: "blue",
  },
  topBar: {
    height: 70,
    flexDirection: "row",
    backgroundColor: colors.white,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    flexDirection: "row",
  },
  subTitle: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: "IBMPlexSans_600SemiBold",
  },
  dropDownFont: {
    fontSize: 18,
    fontFamily: "IBMPlexSans_400Regular",
    marginLeft: 10,
    color: colors.primary,
  },
  dropDown: {
    width: "70%",
    // height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 8,
    backgroundColor: colors.white,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.blue,
  },
  title: {
    color: colors.primary,
    fontSize: 26,
    fontFamily: "IBMPlexSans_600SemiBold",
    marginBottom: 10,
  },
  trash: {
    marginLeft: 14,
  },
  note: {
    color: colors.primary,
    fontSize: 21,
    fontFamily: "IBMPlexSans_400Regular",
    flexShrink: 1,
    flexWrap: "wrap",
    marginBottom: 20,
  },
});

export default NoteDetailScreen;
