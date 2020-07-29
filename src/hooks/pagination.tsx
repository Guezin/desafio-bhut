import React, { createContext, useContext, useState, useCallback } from 'react';

import { useFilter } from './filter';

import { ICar } from '../components/Car';

interface IButtonsPage {
  id: number;
  value: number;
}

interface IPaginationProviderProps {
  numberOfCarsToBeDisplayed: ICar[];
  handlePagination: (cars: ICar[]) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pagingButtons: IButtonsPage[];
}

const PaginationContext = createContext({} as IPaginationProviderProps);

const PaginationProvider: React.FC = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [pagingButtons, setPagingButtons] = useState<IButtonsPage[]>([]);

  const { carsFound } = useFilter();

  const [numberOfCarsToBeDisplayed, setNumberOfCarsToBeDisplayed] = useState<
    ICar[]
  >([]);

  const handlePagingButtons = useCallback(
    (totalPage: number) => {
      const totalButtons = Math.ceil(totalPage / limit);

      return Array.from({ length: totalButtons }, (_, index) => ({
        id: index + 1,
        value: index + 1,
      }));
    },
    [limit]
  );

  const handlePagination = useCallback(
    (cars: ICar[]) => {
      const startPage = (currentPage - 1) * limit;
      const endPage = currentPage * limit;

      let carsToBeDisplayed: ICar[] = [];

      if (carsFound.length === limit) {
        setCurrentPage(1);
      }

      if (carsFound.length >= limit) {
        carsToBeDisplayed = carsFound.slice(startPage, endPage);

        setPagingButtons(handlePagingButtons(carsFound.length));
        setNumberOfCarsToBeDisplayed(carsToBeDisplayed);

        return;
      }

      if (carsFound.length) {
        carsToBeDisplayed = carsFound;

        setPagingButtons([]);
        setNumberOfCarsToBeDisplayed(carsToBeDisplayed);

        return;
      }

      if (cars.length > limit) {
        const result = cars.slice(startPage, endPage);

        carsToBeDisplayed = result;
      }

      if (cars.length < limit) {
        carsToBeDisplayed = cars;
      }

      setPagingButtons(handlePagingButtons(cars.length));
      setNumberOfCarsToBeDisplayed(carsToBeDisplayed);
    },
    [currentPage, limit, handlePagingButtons, carsFound]
  );

  return (
    <PaginationContext.Provider
      value={{
        handlePagination,
        currentPage,
        setCurrentPage,
        pagingButtons,
        numberOfCarsToBeDisplayed,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

const usePagination = (): IPaginationProviderProps => {
  const context = useContext(PaginationContext);

  return context;
};

export { PaginationProvider, usePagination };
