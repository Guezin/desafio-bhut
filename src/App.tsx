import React from 'react';

import AppProvider from './hooks';

import Home from './pages/Home';

const App: React.FC = () => (
  <AppProvider>
    <Home />
  </AppProvider>
);

export default App;
