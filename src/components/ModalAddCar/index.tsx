import React, { useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import api from '../../services/api';

import Modal, { IModalProps } from '../Modal';
import Input from '../InputModal';

import { Form } from './styles';

interface IFormSubmitData {
  title: string;
  brand: string;
  price: string;
  age: number;
}

const ModalAddCar: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const handleSubmit = useCallback(
    async ({ title, brand, price, age }: IFormSubmitData) => {
      await api.post('/cars', {
        title,
        brand,
        price,
        age,
      });

      setIsOpen();
    },
    [setIsOpen]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Adicionar carro</h1>

        <Input type="text" name="title" placeholder="Modelo" required />
        <Input type="text" name="brand" placeholder="Marca" required />
        <Input type="text" name="price" placeholder="Ex: 30.000" required />
        <Input type="number" name="age" placeholder="Ano" required />

        <button type="submit">
          <p>Adicionar</p>

          <div>
            <FiCheckSquare size={24} color="#fff" />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddCar;
