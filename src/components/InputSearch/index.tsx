import React, { InputHTMLAttributes, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';

import { useCar } from '../../hooks/car';
import { usePagination } from '../../hooks/pagination';
import { useFilter } from '../../hooks/filter';
import { useToast } from '../../hooks/toast';

import { Container } from './styles';

import { ICar } from '../Car';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const InputSearch: React.FC<InputProps> = ({ ...rest }) => {
  const { cars } = useCar();
  const { handlePagination } = usePagination();
  const { carWasFound, setCarWasFound } = useFilter();
  const { addToast } = useToast();

  const handleSearchValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const listOfCarsFound: ICar[] = [];
      const searchValue = event.target.value;
      const firstLetterConvertedToUppercase = searchValue
        .substring(0, 1)
        .toUpperCase()
        .concat(searchValue.substring(1));

      cars.forEach(car => {
        if (car.title === searchValue) {
          listOfCarsFound.push(car);
        } else if (car.title === firstLetterConvertedToUppercase) {
          listOfCarsFound.push(car);
        }
      });

      if (listOfCarsFound.length) {
        setCarWasFound(true);
        handlePagination(listOfCarsFound);
        return;
      }

      if (!listOfCarsFound.length) {
        handlePagination(cars);
        setCarWasFound(false);
      }
    },
    [cars, handlePagination, setCarWasFound]
  );

  const handlePressEnterButton = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (!carWasFound) {
          addToast({
            type: 'error',
            title: 'Nenhum registro',
            description:
              'Nunhum veículo foi encontrado, verifique se o nome está correto!',
          });
        }
      }
    },
    [addToast, carWasFound]
  );

  return (
    <Container>
      <input
        placeholder="Buscar..."
        onChange={handleSearchValue}
        {...rest}
        onKeyDown={handlePressEnterButton}
      />

      <FiSearch size={20} color="#aaa" />
    </Container>
  );
};

export default InputSearch;
