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
}

const Car: React.FC<IProps> = ({ car }) => {
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
          <EditButton>
            <FiEdit3 size={20} color="#fff" />
          </EditButton>

          <DeleteButton>
            <FiTrash2 size={20} color="#fff" />
          </DeleteButton>
        </div>
      </Content>
    </Container>
  );
};

export default Car;
