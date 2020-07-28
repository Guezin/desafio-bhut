import React, { createContext, useContext, useState, useEffect } from 'react';

import { usePagination } from './pagination';

import { ICar } from '../components/Car';

interface IFilterProviderProps {
  carsFound: ICar[];
  setCarsFound: React.Dispatch<React.SetStateAction<ICar[]>>;
}

const FilterContext = createContext({} as IFilterProviderProps);

const FilterProvider: React.FC = ({ children }) => {
  const [carsFound, setCarsFound] = useState<ICar[]>([]);

  return (
    <FilterContext.Provider value={{ carsFound, setCarsFound }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = (): IFilterProviderProps => {
  const context = useContext(FilterContext);

  return context;
};

export { FilterProvider, useFilter };
