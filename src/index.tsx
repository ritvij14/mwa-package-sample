import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';

export const ExampleComponent: React.FC = () => {
  return (
    <Box>
      <Box
        alignSelf="center" // bg="primary.500"
        marginTop="50%"
        _text={{
          fontSize: 'md',
          fontWeight: 'medium',
          color: 'warmGray.50',
          letterSpacing: 'lg',
        }}
        bg={['red.400', 'blue.400']}
      >
        This is a Box
      </Box>
    </Box>
  );
};

export { NativeBaseProvider };
