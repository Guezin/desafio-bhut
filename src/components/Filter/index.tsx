import React, { useCallback } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';

import { useCar } from '../../hooks/car';
import { useFilter } from '../../hooks/filter';
import { usePagination } from '../../hooks/pagination';

import { ICar } from '../Car';

import { Container, Content, Brand } from './styles';

const Filter: React.FC = () => {
  const { cars } = useCar();
  const {
    setCarsFound,
    brands,
    setBrands,
    selectedFilter,
    setSelectedFilter,
    selectedBrand,
    setSelectedBrand,
  } = useFilter();
  const { setCurrentPage } = usePagination();

  const removeDuplicates = useCallback(() => {
    const carBrands: string[] = [];

    cars.forEach(car => {
      if (!carBrands.includes(car.brand)) {
        carBrands.push(car.brand);
      }
    });

    setBrands(carBrands);
  }, [cars, setBrands]);

  const handleSelectedFilter = useCallback(() => {
    setSelectedFilter(!selectedFilter);

    removeDuplicates();
  }, [selectedFilter, removeDuplicates, setSelectedFilter]);

  const handleBrandSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target;
      const carsFound: ICar[] = [];

      setSelectedBrand(input.value);

      cars.forEach((car): void => {
        if (car.brand === input.value) {
          carsFound.push(car);
        }
      });

      setCarsFound(carsFound);
    },
    [cars, setCarsFound, setSelectedBrand]
  );

  const handleRemoveFilter = useCallback(() => {
    setSelectedBrand('');
    setCurrentPage(1);
    setCarsFound([]);
  }, [setCarsFound, setCurrentPage, setSelectedBrand]);

  return (
    <Container>
      <button type="button" onClick={handleSelectedFilter}>
        {selectedFilter || !!selectedBrand ? (
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
