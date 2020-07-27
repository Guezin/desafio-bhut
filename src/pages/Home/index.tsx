import React, { useEffect, useState, useCallback, useMemo } from 'react';

import api from '../../services/api';

import Car, { ICar } from '../../components/Car';
import InputSearch from '../../components/InputSearch';
import Filter from '../../components/Filter';
import Button from '../../components/PagingButton';
import ModalAddCar from '../../components/ModalAddCar';
import ModalDeleteCar from '../../components/ModalDeleteCar';
import ModalEditCar from '../../components/ModalEditCar';

import {
  Container,
  ContentSearch,
  Separator,
  ContainerPagingButtons,
} from './styles';

interface IButtonsPage {
  id: number;
  value: number;
}

const Home: React.FC = () => {
  const [carsFound, setCarsFound] = useState<ICar[]>([]);
  const [cars, setCars] = useState<ICar[]>([]);
  const [numberOfCarsToBeDisplayed, setNumberOfCarsToBeDisplayed] = useState<
    ICar[]
  >([]);
  const [editingCar, setEditingCar] = useState<ICar>({} as ICar);
  const [carToBeDeleted, setCarToBeDeleted] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [pagingButtons, setPagingButtons] = useState<IButtonsPage[]>([]);

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
    (_cars: ICar[]) => {
      const startPage = (currentPage - 1) * limit;
      const endPage = currentPage * limit;

      const CarsToBeDisplayed = _cars.slice(startPage, endPage);

      const buttons = handlePagingButtons(_cars.length);

      setPagingButtons(buttons);
      setNumberOfCarsToBeDisplayed(CarsToBeDisplayed);
    },
    [currentPage, limit, handlePagingButtons]
  );

  const handleChangePage = useCallback(page => {
    setCurrentPage(page);
  }, []);

  const toggleModalAddCar = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleModalEditCar = useCallback(() => {
    setEditModalOpen(!editModalOpen);
  }, [editModalOpen]);

  const handleEditCar = useCallback(
    car => {
      setEditingCar(car);
      toggleModalEditCar();
    },
    [toggleModalEditCar]
  );

  const toggleModalDeleteCar = useCallback(() => {
    setDeleteModalOpen(!deleteModalOpen);
  }, [deleteModalOpen]);

  const handleDeleteCar = useCallback(
    (id: string) => {
      setCarToBeDeleted(id);
      toggleModalDeleteCar();
    },
    [toggleModalDeleteCar]
  );

  const handleSearchValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const result = cars.filter(car => car.title === event.target.value);

      if (result.length > 0) {
        setCarsFound(result);
        return;
      }

      if (!result.length) {
        handlePagination(cars);
      }

      setCarsFound([]);
    },
    [cars, handlePagination]
  );

  const handleCarsFound = useMemo(() => {
    if (carsFound.length) {
      handlePagination(carsFound);
    }

    return carsFound.map(car => (
      <Car
        key={car.id}
        car={car}
        handleDeleteCar={handleDeleteCar}
        handleEditCar={handleEditCar}
      />
    ));
  }, [carsFound, handleDeleteCar, handleEditCar, handlePagination]);

  const handleNumberOfCarsToBeDisplayed = useMemo(() => {
    return numberOfCarsToBeDisplayed.map(car => (
      <Car
        key={car.id}
        car={car}
        handleDeleteCar={handleDeleteCar}
        handleEditCar={handleEditCar}
      />
    ));
  }, [numberOfCarsToBeDisplayed, handleDeleteCar, handleEditCar]);

  useEffect(() => {
    const loadTheCars = async () => {
      const { data } = await api.get<ICar[]>('/cars');

      // const data = [
      //   {
      //     id: '5dba13f8a9497b001d834b62',
      //     title: 'fusca',
      //     brand: 'volkswagen',
      //     price: '8000',
      //     age: 1987,
      //   },

      //   {
      //     id: '5dba13f8a9497b001d834b63',
      //     title: 'variant',
      //     brand: 'volkswagen',
      //     price: '13000',
      //     age: 1990,
      //   },

      //   {
      //     id: '5dba13f8a9497b001d834b64',
      //     title: 'Gol G5',
      //     brand: 'volkswagen',
      //     price: '27500',
      //     age: 2013,
      //   },

      //   {
      //     id: '5dba13f8a9497b001d834b65',
      //     title: 'Uno 1.0',
      //     brand: 'FIAT',
      //     price: '10500',
      //     age: 2002,
      //   },

      //   {
      //     id: '5dba13f8a9497b001d834b66',
      //     title: 'BWM M3',
      //     brand: 'BMW',
      //     price: '120000',
      //     age: 2018,
      //   },

      //   {
      //     id: '5dba13f8a9497b001d834b67',
      //     title: 'Audi a3',
      //     brand: 'audi',
      //     price: '28500',
      //     age: 2013,
      //   },

      //   {
      //     id: '5dba13f8a9497b001d834b68',
      //     title: 'Jeep',
      //     brand: 'jeep',
      //     price: '60000',
      //     age: 2017,
      //   },
      // ];

      setCars(data);
      handlePagination(data);
    };

    loadTheCars();
  }, [handlePagination]);

  return (
    <Container>
      <ModalAddCar isOpen={modalOpen} setIsOpen={toggleModalAddCar} />
      <ModalDeleteCar
        isOpen={deleteModalOpen}
        setIsOpen={toggleModalDeleteCar}
        carToBeDeleted={carToBeDeleted}
      />
      <ModalEditCar
        isOpen={editModalOpen}
        setIsOpen={toggleModalEditCar}
        editingCar={editingCar}
      />

      <h1>Carros</h1>

      <section>
        <button type="button" onClick={toggleModalAddCar}>
          Adicionar carro
        </button>

        <ContentSearch>
          <Filter cars={cars} pagination={handlePagination} />

          <Separator />

          <InputSearch placeholder="Buscar..." onChange={handleSearchValue} />
        </ContentSearch>
      </section>

      {carsFound.length ? handleCarsFound : handleNumberOfCarsToBeDisplayed}

      <ContainerPagingButtons>
        {pagingButtons.map(button => (
          <Button
            key={button.id}
            type="button"
            selected={button.id === currentPage}
            onClick={() => handleChangePage(button.id)}
          >
            {button.value}
          </Button>
        ))}
      </ContainerPagingButtons>
    </Container>
  );
};

export default Home;
