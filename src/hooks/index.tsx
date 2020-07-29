import React from 'react';

import { CarProvider } from './car';
import { ToastProvider } from './toast';
import { PaginationProvider } from './pagination';
import { FilterProvider } from './filter';

const AppProvider: React.FC = ({ children }) => (
  <FilterProvider>
    <PaginationProvider>
      <ToastProvider>
        <CarProvider>{children}</CarProvider>
      </ToastProvider>
    </PaginationProvider>
  </FilterProvider>
);

export default AppProvider;
