import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';

import { useFilter } from '../../hooks/filter';
import { useCar } from '../../hooks/car';
import { usePagination } from '../../hooks/pagination';

import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const InputSearch: React.FC<InputProps> = ({ ...rest }) => {
  const { setCarsFound } = useFilter();
  const { cars } = useCar();
  const { handlePagination } = usePagination();

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
    [cars, handlePagination, setCarsFound]
  );

  return (
    <Container>
      <input placeholder="Buscar..." onChange={handleSearchValue} {...rest} />

      <FiSearch size={20} color="#aaa" />
    </Container>
  );
};

export default InputSearch;
