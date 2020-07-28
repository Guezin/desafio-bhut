import React, { useState, useCallback, useMemo } from 'react';

import { useCar } from '../../hooks/car';
import { usePagination } from '../../hooks/pagination';
import { useFilter } from '../../hooks/filter';

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

const Home: React.FC = () => {
  const { cars } = useCar();
  const { carsFound } = useFilter();
  const {
    handlePagination,
    currentPage,
    setCurrentPage,
    pagingButtons,
    numberOfCarsToBeDisplayed,
  } = usePagination();

  const [editingCar, setEditingCar] = useState<ICar>({} as ICar);
  const [carToBeDeleted, setCarToBeDeleted] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleChangePage = useCallback(
    page => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

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
    (_id: string) => {
      setCarToBeDeleted(_id);
      toggleModalDeleteCar();
    },
    [toggleModalDeleteCar]
  );

  const handleCarsFound = useMemo(() => {
    if (carsFound.length) {
      handlePagination(carsFound);
    }

    return carsFound.map(car => (
      <Car
        key={car._id}
        car={car}
        handleDeleteCar={handleDeleteCar}
        handleEditCar={handleEditCar}
      />
    ));
  }, [carsFound, handleDeleteCar, handleEditCar, handlePagination]);

  const handleNumberOfCarsToBeDisplayed = useMemo(() => {
    return numberOfCarsToBeDisplayed.map(car => (
      <Car
        key={car._id}
        car={car}
        handleDeleteCar={handleDeleteCar}
        handleEditCar={handleEditCar}
      />
    ));
  }, [numberOfCarsToBeDisplayed, handleDeleteCar, handleEditCar]);

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
          <Filter />

          <Separator />

          <InputSearch />
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
