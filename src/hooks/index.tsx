import React from 'react';

import { CarProvider } from './car';
import { PaginationProvider } from './pagination';
import { FilterProvider } from './filter';

const AppProvider: React.FC = ({ children }) => (
  <FilterProvider>
    <PaginationProvider>
      <CarProvider>{children}</CarProvider>
    </PaginationProvider>
  </FilterProvider>
);

export default AppProvider;
