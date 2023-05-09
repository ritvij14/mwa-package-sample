import React from "react";
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol";
import {
  Button,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";

export const ExampleComponent = () => {
  const showToast = (msg: string) => {
    ToastAndroid.show(`Error: ${msg}`, ToastAndroid.SHORT);
  };

  return (
    <Button
      title="Authorize"
      onPress={() => {
        try {
          transact(async (mobileWallet) => {
            const authorization = await mobileWallet.authorize({
              cluster: "devnet",
              identity: { name: "My Expo App" },
            });
            console.log(authorization);
          });
        } catch (error) {
          showToast(error as unknown as string);
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#6638f0",
    height: "50%",
  },
});
