import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import DropDown from "../components/DropDown";

import Screen from "../components/Screen";
import colors from "../config/colors";
import Note from "../components/Note";
import Message from "../components/Message";
import { clients } from "../data/data";

function MainScreen({ route, navigation }) {
  const { noteSaved, noteDeleted } = route.params || {};
  const [noteData, setNoteData] = useState([]);
  const [noteDataCategorized, setNoteDataCategorized] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const isFocused = useIsFocused();
  const [searchValue, setSearchValue] = useState("");
  const [clientValue, setClientValue] = useState("All");

  const createNote = () => {
    navigation.navigate("CreateNoteScreen");
  };

  // getting note data
  const getData = async () => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem("notes"));
      setNoteData(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  // get the note data when the screen in on focus
  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      // Notify the user when the note is saved or deleted
      if (noteSaved) {
        setShowMessage(true);
        setMessage("Note is saved");
        const toRef = setTimeout(() => {
          setShowMessage(false);
          clearTimeout(toRef);
        }, 1000);
      }
      if (noteDeleted) {
        setShowMessage(true);
        setMessage("Note is deleted");
        const toRef = setTimeout(() => {
          setShowMessage(false);
          clearTimeout(toRef);
        }, 1000);
      }
    }
  }, [route.params]);

  // Runs whenever user types something in the search bar
  const onChangeText = async (newText) => {
    setSearchValue(newText);
    if (newText !== "") {
      // if note's title or note includes what user typed in the search bar, show it
      let searchedNoteData = noteDataCategorized.filter(
        (note) => note.title.includes(newText) || note.note.includes(newText)
      );
      setNoteData(searchedNoteData);
    } else {
      // if the search bar is empty, reset the noteData according to the client selected
      setNoteData(noteDataCategorized);
    }
  };

  // Runs whenever user changes dropdown value
  const onChangeDropdown = async () => {
    setSearchValue("");
    if (clientValue !== "All") {
      let noteDataCopy = await getData();
      // if note's client value is equal to what use selected in the dropdown, show it
      let searchedNoteData = noteDataCopy.filter(
        (note) => note.client === clientValue
      );
      setNoteData(searchedNoteData);
      setNoteDataCategorized(searchedNoteData);
    } else {
      // show all the notes
      let noteDataCopy = await getData();
      setNoteDataCategorized(noteDataCopy);
    }
  };

  useEffect(() => {
    onChangeDropdown();
  }, [clientValue]);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Good Morning, {"\n"}Summer</Text>
        </View>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Feather name="search" size={16} color={colors.primary} />
          <TextInput
            style={styles.searchFont}
            multiline={false}
            onChangeText={(newText) => onChangeText(newText)}
            placeholder={"Search"}
            value={searchValue}
          ></TextInput>
        </View>
        {/* Dropdown */}
        <DropDown
          itemType={[{ label: "All", value: "All" }, ...clients]}
          value={clientValue}
          setValue={setClientValue}
          placeholderText={"Select a Client"}
          zIndex={100}
        />
        {/* Notes */}
        {noteData.length < 1 && (
          <Text style={styles.emptyText}>
            You don't have any notes yet. {"\n"} Write your first note !
          </Text>
        )}

        <FlatList
          data={noteData}
          numColumns={2}
          style={styles.list}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 6,
          }}
          renderItem={({ item }) => (
            <Note
              navigation={navigation}
              id={item.id}
              client={item.client}
              category={item.category}
              title={item.title}
              note={item.note}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        {/* Add notes button */}
        <TouchableOpacity style={styles.button} onPress={() => createNote()}>
          <Feather name="plus" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
      {showMessage && (
        <Message message={message} setShowMessage={setShowMessage} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    height: 130,
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontFamily: "IBMPlexSans_700Bold",
    color: colors.primary,
  },
  emptyText: {
    fontSize: 20,
    fontFamily: "IBMPlexSans_400Regular",
    color: colors.grey,
    textAlign: "center",
    marginTop: 50,
  },
  searchFont: {
    fontSize: 18,
    fontFamily: "IBMPlexSans_400Regular",
    marginLeft: 10,
    color: colors.primary,
  },
  searchBar: {
    width: "100%",
    height: 44,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.blue,
  },
  list: {
    marginTop: 34,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: colors.secondary,
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
