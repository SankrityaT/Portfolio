// _app.tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';

// Create a custom theme using Material UI
const theme = createTheme({
  palette: {
    mode: 'light', // Change to 'dark' if you want dark mode
    primary: {
      main: '#4dabf7', // Customize with your preferred primary color
    },
    background: {
      default: '#1b233d', // Set a global background color if needed
    },
  },
  typography: {
    fontFamily: ['Nunito', 'Courier Prime', 'sans-serif'].join(','),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets the CSS to ensure consistency across browsers */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
