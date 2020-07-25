import React from 'react';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

import { Container, Content, EditButton, DeleteButton } from './styles';

export interface ICar {
  id: string;
  title: string;
  brand: string;
  price: string;
  age: number;
}

interface IProps {
  car: ICar;
  handleEditCar?: () => void;
  handleDeleteCar?: () => void;
}

const Car: React.FC<IProps> = ({ car, handleDeleteCar, handleEditCar }) => {
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
          <p>
            R$
            {car.price}
          </p>
        </section>

        <div>
          <EditButton onClick={handleEditCar}>
            <FiEdit3 size={20} color="#fff" />
          </EditButton>

          <DeleteButton onClick={handleDeleteCar}>
            <FiTrash2 size={20} color="#fff" />
          </DeleteButton>
        </div>
      </Content>
    </Container>
  );
};

export default Car;
