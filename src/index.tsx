import React, { useState } from "react";
import {
  SolanaMobileWalletAdapterProtocolError,
  transact,
} from "@solana-mobile/mobile-wallet-adapter-protocol";
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { Buffer } from "buffer";
import * as Crypto from "expo-crypto";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { toUint8Array } from "js-base64";

global.Buffer = Buffer;

export const ExampleComponent = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [auth, setAuth] = useState<
    Readonly<{
      accounts: Readonly<{
        address: string;
        label?: string | undefined;
      }>[];
      auth_token: string;
      wallet_uri_base: string;
    }>
  >();
  const showToast = (msg: string) => {
    ToastAndroid.show(`Error: ${msg}`, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Authorize"
        onPress={async () => {
          try {
            setLogs([...logs, "NEW WALLET CONNECTION"]);
            transact(async (mobileWallet) => {
              const authorization = await mobileWallet.authorize({
                cluster: "devnet",
                identity: { name: "My Expo App" },
              });
              setAuth(authorization);
              showToast("Connected");
              setLogs([
                ...logs,
                authorization.auth_token,
                authorization.wallet_uri_base,
                authorization.accounts[0].address,
                authorization.accounts.length.toString(),
              ]);
            });
          } catch (error) {
            setLogs([...logs, "ERROR"]);
            showToast(error as unknown as string);
          }
        }}
      />
      {auth && (
        <Button
          title="Sign Txn"
          onPress={async () => {
            try {
              setLogs([...logs, "RE AUTH"]);
              const connection = new Connection(
                clusterApiUrl("devnet"),
                "confirmed"
              );
              setLogs([...logs, "CONNECTION MADE"]);

              const latestBlockhash = await connection.getLatestBlockhash();
              setLogs([...logs, "GOT LATEST BLOCK HASH"]);

              const randomTransferTransaction = new Transaction({
                ...latestBlockhash,
                feePayer: new PublicKey(toUint8Array(auth.accounts[0].address)),
              }).add(
                SystemProgram.transfer({
                  fromPubkey: new PublicKey(
                    toUint8Array(auth.accounts[0].address)
                  ),
                  toPubkey: new PublicKey(
                    "4uca71qiJ9eB1LBgXYRUmRTzd9aYzJonBFE8c57rTpdB"
                  ),
                  lamports: 700000000,
                })
              );

              transact(async (mobileWallet) => {
                // Sign and return the transactions.
                try {
                  setLogs([...logs, "SENDING TXN"]);
                  const authorizationResult = await mobileWallet.reauthorize({
                    auth_token: auth.auth_token,
                    identity: { name: "My Expo App" },
                  });
                  const txn = await mobileWallet.signAndSendTransactions({
                    payloads: [
                      randomTransferTransaction.serialize().toString("base64"),
                    ],
                  });
                } catch (e) {
                  setLogs([
                    ...logs,
                    "ERRRRORORRR",
                    (e as unknown as string).toString(),
                  ]);
                  if (e instanceof SolanaMobileWalletAdapterProtocolError) {
                    showToast(e.message);
                    // await wallet.reauthorize({ auth_token, identity });
                    // Retry...
                  }
                }
                // showToast(txn.signatures[0]);
              });
              setLogs([...logs, "CREATED TXN WITH TRANSFER INSTRUCTION"]);
            } catch (error) {
              showToast(error as unknown as string);
            }
          }}
        />
      )}
      <Text>{logs.join("     \n     ")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
});
