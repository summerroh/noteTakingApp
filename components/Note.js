import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function Note({ id, navigation, client, category, title, note }) {
  const notePressed = () => {
    navigation.navigate("NoteDetailScreen", {
      id,
      client,
      category,
      title,
      note,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => notePressed()}>
      <Text numberOfLines={1} style={styles.title}>
        {client}
      </Text>
      <Text numberOfLines={1} style={[styles.note, { marginBottom: 10 }]}>
        {category}
      </Text>
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <Text style={styles.note}>{note}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "49%",
    height: 186,
    backgroundColor: colors.primary,
    borderRadius: 18,
    padding: 20,
    overflow: "hidden",
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "IBMPlexSans_600SemiBold",
  },
  note: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "IBMPlexSans_400Regular",
    flexShrink: 1,
    flexWrap: "wrap",
  },

  marginBottom: {
    marginBottom: 10,
  },
});

export default Note;
