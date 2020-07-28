import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import api from '../services/api';
import { usePagination } from './pagination';

import { ICar } from '../components/Car';

interface IHandleAddCarProps {
  title: string;
  brand: string;
  price: string;
  age: number;
}

interface ICarProviderProps {
  cars: ICar[];
}

const CarContext = createContext({} as ICarProviderProps);

const CarProvider: React.FC = ({ children }) => {
  const [cars, setCars] = useState<ICar[]>([]);

  const { handlePagination } = usePagination();

  const handleAddCar = useCallback(
    async ({ title, brand, price, age }: IHandleAddCarProps) => {
      await api.post('/cars', {
        title,
        brand,
        price,
        age,
      });
    },
    []
  );

  useEffect(() => {
    const loadTheCars = async () => {
      // const { data } = await api.get<ICar[]>('/cars');

      const data = [
        {
          _id: '5dba13f8a9497b001d834b62',
          title: 'fusca',
          brand: 'volkswagen',
          price: '8000',
          age: 1987,
        },

        {
          _id: '5dba13f8a9497b001d834b63',
          title: 'variant',
          brand: 'volkswagen',
          price: '13000',
          age: 1990,
        },

        {
          _id: '5dba13f8a9497b001d834b64',
          title: 'Gol G5',
          brand: 'volkswagen',
          price: '27500',
          age: 2013,
        },

        {
          _id: '5dba13f8a9497b001d834b65',
          title: 'Uno 1.0',
          brand: 'FIAT',
          price: '10500',
          age: 2002,
        },

        {
          _id: '5dba13f8a9497b001d834b66',
          title: 'BWM M3',
          brand: 'BMW',
          price: '120000',
          age: 2018,
        },

        {
          _id: '5dba13f8a9497b001d834b67',
          title: 'Audi a3',
          brand: 'audi',
          price: '28500',
          age: 2013,
        },

        {
          _id: '5dba13f8a9497b001d834b68',
          title: 'Jeep',
          brand: 'jeep',
          price: '60000',
          age: 2017,
        },
      ];

      setCars(data);
      handlePagination(data);
    };

    loadTheCars();
  }, [handlePagination]);

  return <CarContext.Provider value={{ cars }}>{children}</CarContext.Provider>;
};

const useCar = (): ICarProviderProps => {
  const context = useContext(CarContext);

  return context;
};

export { CarProvider, useCar };
