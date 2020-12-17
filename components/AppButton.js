import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const AppButton = ({ buttonBg = "#009688", onPress, text }) => {
  return (
    <TouchableOpacity
      style={[styles.appButtonContainer, { backgroundColor: buttonBg }]}
      onPress={onPress}
    >
      <Text style={styles.appButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
export default AppButton;
