import React, { useEffect, useState, useCallback } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';

import api from '../../services/api';

import Car, { ICar } from '../../components/Car';
import Input from '../../components/Input';
import Button from '../../components/PagingButton';

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
  const [_cars, setCars] = useState<ICar[]>([]);

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
    (cars: ICar[]) => {
      const startPage = (currentPage - 1) * limit;
      const endPage = currentPage * limit;

      const numberOfCarsToBeDisplayed = cars.slice(startPage, endPage);

      const buttons = handlePagingButtons(cars.length);

      setPagingButtons(buttons);
      setCars(numberOfCarsToBeDisplayed);
    },
    [currentPage, limit, handlePagingButtons]
  );

  const handleChangePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    const loadTheCars = async () => {
      const { data } = await api.get<ICar[]>('/cars');

      handlePagination(data);
    };

    loadTheCars();
  }, [handlePagination]);

  return (
    <Container>
      <h1>Carros</h1>

      <section>
        <button type="button">Adicionar carro</button>

        <ContentSearch>
          <FiFilter size={20} color="#fff" />

          <Separator />

          <Input icon={FiSearch} placeholder="Buscar..." />
        </ContentSearch>
      </section>

      {_cars.map((car, index) => (
        <Car key={index} car={car} />
      ))}

      <ContainerPagingButtons>
        {pagingButtons.map((button) => (
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
