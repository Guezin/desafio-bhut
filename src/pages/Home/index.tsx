import React, { useState, useCallback, useMemo } from 'react';

import { useCar } from '../../hooks/car';
import { usePagination } from '../../hooks/pagination';

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
  const [editingCar, setEditingCar] = useState<ICar>({} as ICar);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { setCarToBeDeleted } = useCar();
  const {
    currentPage,
    setCurrentPage,
    pagingButtons,
    numberOfCarsToBeDisplayed,
  } = usePagination();

  const toggleModalAddCar = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleModalEditCar = useCallback(() => {
    setEditModalOpen(!editModalOpen);
  }, [editModalOpen]);

  const toggleModalDeleteCar = useCallback(() => {
    setDeleteModalOpen(!deleteModalOpen);
  }, [deleteModalOpen]);

  const handleEditCar = useCallback(
    car => {
      setEditingCar(car);
      toggleModalEditCar();
    },
    [toggleModalEditCar]
  );

  const handleDeleteCar = useCallback(
    (_id: string) => {
      setCarToBeDeleted(_id);
      toggleModalDeleteCar();
    },
    [toggleModalDeleteCar, setCarToBeDeleted]
  );

  const carsToBeDisplayed = useMemo(() => {
    return numberOfCarsToBeDisplayed.map(car => (
      <Car
        key={car._id}
        car={car}
        handleDeleteCar={handleDeleteCar}
        handleEditCar={handleEditCar}
      />
    ));
  }, [handleEditCar, handleDeleteCar, numberOfCarsToBeDisplayed]);

  const pagingButtonsToBeDisplayed = useMemo(() => {
    return pagingButtons.map(button => (
      <Button
        key={button.id}
        type="button"
        selected={button.id === currentPage}
        onClick={() => setCurrentPage(button.id)}
      >
        {button.value}
      </Button>
    ));
  }, [currentPage, pagingButtons, setCurrentPage]);

  return (
    <Container>
      <ModalAddCar isOpen={modalOpen} setIsOpen={toggleModalAddCar} />
      <ModalDeleteCar
        isOpen={deleteModalOpen}
        setIsOpen={toggleModalDeleteCar}
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

      {carsToBeDisplayed}

      <ContainerPagingButtons>
        {pagingButtons.length > 1 && pagingButtonsToBeDisplayed}
      </ContainerPagingButtons>
    </Container>
  );
};

export default Home;
