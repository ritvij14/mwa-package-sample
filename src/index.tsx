import React from 'react';
import { NativeBaseProvider, Box, Button } from 'native-base';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol';

export const ExampleComponent: React.FC = () => {
  return (
    <Box>
      <Button
        onPress={() => {
          transact(async (mobileWallet) => {
            const authorization = await mobileWallet.authorize({
              cluster: 'devnet',
              identity: { name: 'My Expo App' },
            });
            console.log(authorization);
          });
        }}
      >
        Authorize
      </Button>
    </Box>
  );
};

export { NativeBaseProvider };
