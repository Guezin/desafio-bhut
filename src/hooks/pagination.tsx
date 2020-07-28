import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

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

      const CarsToBeDisplayed = cars.slice(startPage, endPage);

      const buttons = handlePagingButtons(cars.length);

      setPagingButtons(buttons);
      setNumberOfCarsToBeDisplayed(CarsToBeDisplayed);
    },
    [currentPage, limit, handlePagingButtons]
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
