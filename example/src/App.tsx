import * as React from 'react';

import { ExampleComponent, NativeBaseProvider } from 'elements-mobile-sdk';

export default function App() {
  return (
    <NativeBaseProvider>
      <ExampleComponent />
    </NativeBaseProvider>
  );
}
