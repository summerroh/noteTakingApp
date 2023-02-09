import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../config/colors";
import Screen from "../components/Screen";
import DropDown from "../components/DropDown";
import { clients, categories } from "../data/data";

function NoteDetailScreen({ route, navigation }) {
  const [titleValue, setTitleValue] = useState("");
  const [noteValue, setNoteValue] = useState("");
  // Values for React-native-dropdown-picker
  const [clientValue, setClientValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const storeData = async () => {
    // // if there is no category and client, show user Alert
    if (clientValue === "" || categoryValue === "") {
      Alert.alert(
        "Please select client and category to save the note!",
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
    // if there is no title and note, show user Alert
    if (!titleValue.trim() && !noteValue.trim()) {
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
    let date = JSON.stringify(new Date());
    let value = {
      id: date,
      client: clientValue,
      category: categoryValue,
      title: titleValue,
      note: noteValue,
    };

    try {
      // save note data to AsyncStorage
      let noteData = [];
      const result = await AsyncStorage.getItem("notes");
      if (result) {
        noteData = JSON.parse(result);
      }
      let tempNote = [...noteData, value];
      await AsyncStorage.setItem("notes", JSON.stringify(tempNote));
      navigation.navigate("MainScreen", { noteSaved: true });
    } catch (e) {}
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
            placeholder={"Title"}
          ></TextInput>
          <TextInput
            style={styles.note}
            multiline={true}
            onChangeText={(newText) => setNoteValue(newText)}
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
