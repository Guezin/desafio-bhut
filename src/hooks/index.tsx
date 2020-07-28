import React from 'react';

import { CarProvider } from './car';
import { PaginationProvider } from './pagination';
import { FilterProvider } from './filter';

const AppProvider: React.FC = ({ children }) => (
  <PaginationProvider>
    <CarProvider>
      <FilterProvider>{children}</FilterProvider>
    </CarProvider>
  </PaginationProvider>
);

export default AppProvider;
