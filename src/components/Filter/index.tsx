import React, { useCallback, useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';

import { useCar } from '../../hooks/car';
import { usePagination } from '../../hooks/pagination';

import { ICar } from '../Car';

import { Container, Content, Brand } from './styles';

const Filter: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  const { cars } = useCar();
  const { handlePagination } = usePagination();

  const removeDuplicates = useCallback(() => {
    const carBrands: string[] = [];

    cars.forEach(car => {
      if (!carBrands.includes(car.brand)) {
        carBrands.push(car.brand);
      }
    });

    setBrands(carBrands);
  }, [cars]);

  const handleSelectedFilter = useCallback(() => {
    setSelectedFilter(!selectedFilter);

    removeDuplicates();
  }, [selectedFilter, removeDuplicates]);

  const handleBrandSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target;
      const carsFound: ICar[] = [];

      setSelectedBrand(input.value);

      cars.filter((car): void => {
        if (car.brand === input.value) {
          carsFound.push(car);
        }
      });

      handlePagination(carsFound);
    },
    [cars, handlePagination]
  );

  const handleRemoveFilter = useCallback(() => {
    setSelectedBrand('');
    handlePagination(cars);
  }, [cars, handlePagination]);

  return (
    <Container>
      <button type="button" onClick={handleSelectedFilter}>
        {selectedFilter ? (
          <FaFilter size={20} color="#fff" />
        ) : (
          <FiFilter size={20} color="#fff" />
        )}
      </button>

      <Content selectedFilter={selectedFilter}>
        {brands &&
          brands.map(brand => (
            <Brand key={brand} selected={brand === selectedBrand}>
              <button type="button" onClick={handleRemoveFilter}>
                <FiX size={20} color="#fff" />
              </button>

              <label htmlFor={brand}>
                <input
                  type="radio"
                  name="radio"
                  value={brand}
                  onChange={handleBrandSearch}
                />
                {brand}
              </label>
            </Brand>
          ))}
      </Content>
    </Container>
  );
};

export default Filter;
