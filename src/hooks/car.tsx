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
import { useToast } from './toast';

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

  const { handlePagination, setCurrentPage } = usePagination();
  const { addToast } = useToast();
  const {
    carsFound,
    setCarsFound,
    setSelectedBrand,
    selectedFilter,
    setFilterActivated,
    setSelectedFilter,
  } = useFilter();

  const addCar = useCallback(
    async ({ title, brand, price, age }: Omit<ICar, '_id'>) => {
      const { data } = await api.post<ICar>('/cars', {
        title,
        brand,
        price,
        age,
      });

      addToast({
        type: 'success',
        title: 'Tudo OK...',
        description: `Veículo ${title}, adicionado com sucesso!`,
      });

      if (selectedFilter && carsFound.length) {
        setCars(oldState => [...oldState, data]);
        setCarsFound(oldState => [...oldState, data]);
        handlePagination([...carsFound, data]);

        return;
      }

      setCars(oldState => [...oldState, data]);
      handlePagination([...cars, data]);
    },
    [cars, handlePagination, setCarsFound, carsFound, selectedFilter, addToast]
  );

  const updateCar = useCallback(
    async ({ _id, title, brand, price, age }: ICar) => {
      const updatedCarList = cars;
      const indexOfCar = cars.findIndex(car => car._id === _id);

      const { data } = await api.put<ICar>(`/cars/${_id}`, {
        title,
        brand,
        price,
        age,
      });

      updatedCarList[indexOfCar] = Object.assign(data, {
        title,
        brand,
        price,
        age,
      });

      if (selectedFilter && carsFound.length) {
        const updatedCarListFound = carsFound;
        const indexOfCarFound = carsFound.findIndex(car => car._id === _id);

        updatedCarListFound[indexOfCarFound] = Object.assign(data, {
          title,
          brand,
          price,
          age,
        });

        addToast({
          type: 'success',
          title: 'Atualizado',
          description: `Dados atualizados com sucesso!`,
        });

        setCarsFound(updatedCarListFound);
        setCars(updatedCarList);
        handlePagination(updatedCarListFound);

        return;
      }

      addToast({
        type: 'success',
        title: 'Atualizado',
        description: `Dados atualizados com sucesso!`,
      });

      setCars(updatedCarList);

      handlePagination(updatedCarList);
    },
    [cars, handlePagination, carsFound, setCarsFound, selectedFilter, addToast]
  );

  const deleteCar = useCallback(async () => {
    let updatedCarList: ICar[] = [];

    await api.delete(`/cars/${carToBeDeleted}`);

    if (selectedFilter && carsFound.length) {
      const updatedCarListFound = carsFound.filter(
        car => car._id !== carToBeDeleted
      );

      updatedCarList = cars.filter(car => car._id !== carToBeDeleted);

      if (carsFound.length === 1) {
        setCurrentPage(1);
        setSelectedBrand('');
        setFilterActivated(false);
        setSelectedFilter(false);
      }

      addToast({
        type: 'success',
        title: 'Removido',
        description: 'Veículo foi removido.',
      });

      setCarsFound(updatedCarListFound);
      setCars(updatedCarList);
      handlePagination(updatedCarListFound);

      return;
    }

    updatedCarList = cars.filter(car => car._id !== carToBeDeleted);

    addToast({
      type: 'success',
      title: 'Excluido',
      description: 'Veículo foi removido com sucesso.',
    });

    setCars(updatedCarList);
    handlePagination(updatedCarList);
  }, [
    cars,
    carToBeDeleted,
    carsFound,
    setCarsFound,
    handlePagination,
    setCurrentPage,
    setSelectedBrand,
    selectedFilter,
    setSelectedFilter,
    setFilterActivated,
    addToast,
  ]);

  useEffect(() => {
    const loadTheCars = async () => {
      const { data } = await api.get<ICar[]>('/cars');

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
