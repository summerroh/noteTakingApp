import { StyleSheet, Animated, Easing, Text, View } from "react-native";
import React, { useRef, useCallback, useEffect } from "react";

function Message({ message, setShowMessage }) {
  return (
    <View style={[styles.message]}>
      <Text style={styles.messageFont}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#636363",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 100,
    marginHorizontal: 34,
  },
  messageFont: {
    color: "#fff",
    fontSize: 16,
  },
});
export default Message;
