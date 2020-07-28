import React, { useCallback, useMemo } from 'react';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

import formatValue from '../../utils/formatValue';

import { Container, Content, EditButton, DeleteButton } from './styles';

export interface ICar {
  _id: string;
  title: string;
  brand: string;
  price: string;
  age: number;
}

interface IProps {
  car: ICar;
  handleEditCar: (car: ICar) => void;
  handleDeleteCar: (_id: string) => void;
}

const Car: React.FC<IProps> = ({ car, handleDeleteCar, handleEditCar }) => {
  const setEditingCar = useCallback(() => {
    handleEditCar(car);
  }, [handleEditCar, car]);

  const setDeleteCar = useCallback(() => {
    handleDeleteCar(car._id);
  }, [handleDeleteCar, car._id]);

  const formattedPrice = useMemo(() => {
    return formatValue(Number(car.price));
  }, [car.price]);

  return (
    <Container>
      <header>
        <h1>{car.title}</h1>
      </header>

      <Content>
        <section>
          <p>{car.brand}</p>
          <p>
            ano:
            {car.age}
          </p>
          <p>{formattedPrice}</p>
        </section>

        <div>
          <EditButton onClick={setEditingCar}>
            <FiEdit3 size={20} color="#fff" />
          </EditButton>

          <DeleteButton onClick={setDeleteCar}>
            <FiTrash2 size={20} color="#fff" />
          </DeleteButton>
        </div>
      </Content>
    </Container>
  );
};

export default Car;
