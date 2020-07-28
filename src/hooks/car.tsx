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

interface ICarProviderProps {
  cars: ICar[];
  addCar: (car: Omit<ICar, '_id'>) => void;
  updateCar: (car: ICar) => void;
  deleteCar: () => void;
  carToBeDeleted: string;
  setCarToBeDeleted: React.Dispatch<React.SetStateAction<string>>;
}

const CarContext = createContext({} as ICarProviderProps);

const CarProvider: React.FC = ({ children }) => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [carToBeDeleted, setCarToBeDeleted] = useState('');

  const { handlePagination } = usePagination();

  const addCar = useCallback(
    async ({ title, brand, price, age }: Omit<ICar, '_id'>) => {
      const { data } = await api.post<ICar>('/cars', {
        title,
        brand,
        price,
        age,
      });

      // const data = { _id: '99', title, brand, price, age };

      setCars(oldState => [...oldState, data]);
      handlePagination([...cars, data]);
    },
    [cars, handlePagination]
  );

  const updateCar = useCallback(
    async ({ _id, title, brand, price, age }: ICar) => {
      const copyCars = cars;
      const indexOfCar = cars.findIndex(findCar => findCar._id === _id);
      const car = cars.find(findCar => findCar._id === _id);

      copyCars[indexOfCar] = Object.assign(car, { title, brand, price, age });

      // await api.put(`/cars/${_id}`, {
      //   title,
      //   brand,
      //   price,
      //   age,
      // });

      setCars(copyCars);
      handlePagination(copyCars);
    },
    [cars, handlePagination]
  );

  const deleteCar = useCallback(async () => {
    // await api.delete(`/cars/${carToBeDeleted}`);

    const updatedCarList = cars.filter(car => car._id !== carToBeDeleted);

    setCars(updatedCarList);
    handlePagination(updatedCarList);
  }, [cars, carToBeDeleted, handlePagination]);

  useEffect(() => {
    const loadTheCars = async () => {
      // const { data } = await api.get<ICar[]>('/cars');

      const data = [
        {
          _id: '5dba13f8a9497b001d834b61',
          title: 'fusca',
          brand: 'volkswagen',
          price: '8000',
          age: 1987,
        },

        {
          _id: '5dba13f8a9497b001d834b62',
          title: 'fusca',
          brand: 'volkswagen',
          price: '9500',
          age: 1990,
        },

        // {
        //   _id: '5dba13f8a9497b001d834b63',
        //   title: 'variant',
        //   brand: 'volkswagen',
        //   price: '13000',
        //   age: 1990,
        // },

        // {
        //   _id: '5dba13f8a9497b001d834b64',
        //   title: 'Gol G5',
        //   brand: 'volkswagen',
        //   price: '27500',
        //   age: 2013,
        // },

        // {
        //   _id: '5dba13f8a9497b001d834b65',
        //   title: 'Uno 1.0',
        //   brand: 'FIAT',
        //   price: '10500',
        //   age: 2002,
        // },

        // {
        //   _id: '5dba13f8a9497b001d834b66',
        //   title: 'BWM M3',
        //   brand: 'BMW',
        //   price: '120000',
        //   age: 2018,
        // },

        // {
        //   _id: '5dba13f8a9497b001d834b67',
        //   title: 'Audi a3',
        //   brand: 'audi',
        //   price: '28500',
        //   age: 2013,
        // },

        // {
        //   _id: '5dba13f8a9497b001d834b68',
        //   title: 'Jeep',
        //   brand: 'jeep',
        //   price: '60000',
        //   age: 2017,
        // },
      ];

      setCars(data);
      handlePagination(data);
    };

    loadTheCars();
  }, [handlePagination]);

  return (
    <CarContext.Provider
      value={{
        cars,
        addCar,
        updateCar,
        deleteCar,
        carToBeDeleted,
        setCarToBeDeleted,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

const useCar = (): ICarProviderProps => {
  const context = useContext(CarContext);

  return context;
};

export { CarProvider, useCar };
