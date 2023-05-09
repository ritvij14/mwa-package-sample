import React from "react";
import { ExampleComponent } from "elements-mobile-sdk";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <ExampleComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    paddingTop: "50%",
    paddingBottom: "50%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
