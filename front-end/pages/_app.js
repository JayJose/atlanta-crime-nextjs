import { ChakraProvider } from '@chakra-ui/react';

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';
import '../styles/styles.css';

const theme = extendTheme({
  colors: {
    brand: {
      0: '#FFFFFF',
      100: '#6FFFB0', // rgb: 111, 255, 176
      200: '#FD6FFF'
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
