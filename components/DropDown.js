import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import colors from "../config/colors";

function DropDown({ itemType, value, setValue, placeholderText, zIndex }) {
  // Values for React-native-dropdown-picker
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(itemType);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      zIndex={zIndex}
      placeholder={placeholderText}
      style={styles.dropDown}
      dropDownContainerStyle={[
        styles.dropDown,
        {
          paddingVertical: 6,
        },
      ]}
      textStyle={{
        fontSize: 18,
        fontFamily: "IBMPlexSans_400Regular",
        color: "grey",
      }}
      labelStyle={{
        fontSize: 18,
        fontFamily: "IBMPlexSans_400Regular",
        color: "#3C3C3C",
      }}
    />
  );
}

const styles = StyleSheet.create({
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
});

export default DropDown;
