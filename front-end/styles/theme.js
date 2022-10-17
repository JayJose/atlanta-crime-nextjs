import { extendTheme } from '@chakra-ui/react';

const myTheme = extendTheme({
  colors: {
    secondaryFontColor: 'white',
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac'
    }
  },
  fonts: {
    body: 'Monserrat, serif',
    heading: 'Monserrat, serif',
    mono: 'Menlo, monospace'
  },
  fontColors: {
    primary: 'blackAlpha.800',
    secondary: 'blackAlpha.500',
    placeholder: 'blackAlpha.300'
  }
});

export default myTheme;
