import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import api from '../services/api';
import { useFilter } from './filter';
import { usePagination } from './pagination';

import { ICar } from '../components/Car';

interface ICarProviderProps {
  cars: ICar[];
  addCar: (car: Omit<ICar, '_id'>) => Promise<void>;
  updateCar: (car: ICar) => Promise<void>;
  deleteCar: () => Promise<void>;
  carToBeDeleted: string;
  setCarToBeDeleted: React.Dispatch<React.SetStateAction<string>>;
}

const CarContext = createContext({} as ICarProviderProps);

const CarProvider: React.FC = ({ children }) => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [carToBeDeleted, setCarToBeDeleted] = useState('');

  const { handlePagination } = usePagination();
  const { carsFound, setCarsFound } = useFilter();

  const addCar = useCallback(
    async ({ title, brand, price, age }: Omit<ICar, '_id'>) => {
      // const { data } = await api.post<ICar>('/cars', {
      //   title,
      //   brand,
      //   price,
      //   age,
      // });

      const data = { _id: '99', title, brand, price, age };

      if (carsFound.length) {
        setCars(oldState => [...oldState, data]);
        setCarsFound(oldState => [...oldState, data]);
        handlePagination([...carsFound, data]);

        return;
      }

      setCars(oldState => [...oldState, data]);
      handlePagination([...cars, data]);
    },
    [cars, handlePagination, setCarsFound, carsFound]
  );

  const updateCar = useCallback(
    async ({ _id, title, brand, price, age }: ICar) => {
      const updatedCarList = cars;
      const indexOfCar = cars.findIndex(car => car._id === _id);
      const data1 = cars.find(car => car._id === _id);

      // const { data } = await api.put<ICar>(`/cars/${_id}`, {
      //   title,
      //   brand,
      //   price,
      //   age,
      // });

      updatedCarList[indexOfCar] = Object.assign(data1, {
        title,
        brand,
        price,
        age,
      });

      if (carsFound.length) {
        const updatedCarListFound = carsFound;
        const indexOfCarFound = carsFound.findIndex(car => car._id === _id);
        updatedCarListFound[indexOfCarFound] = Object.assign(data1, {
          title,
          brand,
          price,
          age,
        });

        setCarsFound(updatedCarListFound);
        setCars(updatedCarList);
        handlePagination(updatedCarListFound);

        return;
      }

      setCars(updatedCarList);

      handlePagination(updatedCarList);
    },
    [cars, handlePagination, carsFound, setCarsFound]
  );

  const deleteCar = useCallback(async () => {
    let updatedCarList: ICar[] = [];

    if (carsFound.length > 0) {
      const updatedCarListFound = carsFound.filter(
        car => car._id !== carToBeDeleted
      );

      updatedCarList = cars.filter(car => car._id !== carToBeDeleted);

      // await api.delete(`/cars/${carToBeDeleted}`);

      setCarsFound(updatedCarListFound);
      setCars(updatedCarList);
      handlePagination(updatedCarListFound);

      return;
    }

    updatedCarList = cars.filter(car => car._id !== carToBeDeleted);

    setCars(updatedCarList);
    handlePagination(updatedCarList);
  }, [cars, carToBeDeleted, carsFound, setCarsFound, handlePagination]);

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

        {
          _id: '5dba13f8a9497b001d834b63',
          title: 'variant',
          brand: 'volkswagen',
          price: '13000',
          age: 1990,
        },

        {
          _id: '5dba13f8a9497b001d834b54',
          title: 'Golf',
          brand: 'volkswagen',
          price: '16500',
          age: 2004,
        },

        {
          _id: '5dba13f8a9497b001d834b44',
          title: 'Parati',
          brand: 'volkswagen',
          price: '19500',
          age: 2010,
        },

        {
          _id: '5dba13f8a9497b001d834b34',
          title: 'Saveiro',
          brand: 'volkswagen',
          price: '18000',
          age: 2004,
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

        {
          _id: '5dba13f8a9497b001d834b69',
          title: 'Focus',
          brand: 'ford',
          price: '60000',
          age: 2019,
        },

        {
          _id: '5dba13f8a9497b001d834b70',
          title: 'Palio',
          brand: 'FIAT',
          price: '12000',
          age: 2017,
        },

        {
          _id: '5dba13f8a9497b001d834b71',
          title: 'Sandero',
          brand: 'renault',
          price: '32000',
          age: 2016,
        },
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
