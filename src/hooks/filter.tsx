import React, { createContext, useContext, useState } from 'react';

import { ICar } from '../components/Car';

interface IFilterProviderProps {
  carsFound: ICar[];
  setCarsFound: React.Dispatch<React.SetStateAction<ICar[]>>;
  selectedFilter: boolean;
  setSelectedFilter: React.Dispatch<React.SetStateAction<boolean>>;
  brands: string[];
  setBrands: React.Dispatch<React.SetStateAction<string[]>>;
  selectedBrand: string;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string>>;
  carWasFound: boolean;
  setCarWasFound: React.Dispatch<React.SetStateAction<boolean>>;
  filterActivated: boolean;
  setFilterActivated: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterContext = createContext({} as IFilterProviderProps);

const FilterProvider: React.FC = ({ children }) => {
  const [filterActivated, setFilterActivated] = useState(false);
  const [carsFound, setCarsFound] = useState<ICar[]>([]);
  const [carWasFound, setCarWasFound] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  return (
    <FilterContext.Provider
      value={{
        carsFound,
        setCarsFound,
        brands,
        setBrands,
        selectedFilter,
        setSelectedFilter,
        selectedBrand,
        setSelectedBrand,
        carWasFound,
        setCarWasFound,
        filterActivated,
        setFilterActivated,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = (): IFilterProviderProps => {
  const context = useContext(FilterContext);

  return context;
};

export { FilterProvider, useFilter };
