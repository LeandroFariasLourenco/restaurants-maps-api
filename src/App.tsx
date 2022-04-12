import React from 'react';
import { Reset } from 'styled-reset';
import { ThemeProvider } from 'styled-components';
import MapProvider from './core/contexts/MapContext';
import Home from './pages/Home/Home';
import theme from './theme';

import '@material/react-text-field/dist/text-field.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <Reset />
    <MapProvider>
      <Home />
    </MapProvider>
  </ThemeProvider>
);

export default App;
