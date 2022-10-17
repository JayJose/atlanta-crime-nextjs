import { ChakraProvider } from '@chakra-ui/react';

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';
import '../styles/styles.css';

const theme = extendTheme({
  colors: {
    secondaryFontColor: 'white',
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac'
    }
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
    mono: 'Menlo, monospace'
  },
  fontColors: {
    primary: 'blackAlpha.800',
    secondary: 'blackAlpha.500',
    placeholder: 'blackAlpha.300'
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
