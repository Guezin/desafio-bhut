import React, { useCallback, useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';

import { ICar } from '../Car';

import { Container, Content, Brand } from './styles';

interface IFilterProps {
  cars: ICar[];
  pagination: (cars: ICar[]) => void;
}

const Filter: React.FC<IFilterProps> = ({ cars, pagination }) => {
  const [selectedFilter, setSelectedFilter] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');

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

      pagination(carsFound);
    },
    [cars, pagination]
  );

  const handleRemoveFilter = useCallback(() => {
    setSelectedBrand('');
    pagination(cars);
  }, [cars, pagination]);

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
                  id={brand}
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
