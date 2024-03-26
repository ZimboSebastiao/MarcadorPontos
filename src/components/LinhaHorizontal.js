import React from "react";
import { View, StyleSheet } from "react-native";

const HorizontalLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    marginVertical: 25,
    height: 1,
    width: "100%",
    backgroundColor: "#D3D3D3",
  },
});

export default HorizontalLine;
