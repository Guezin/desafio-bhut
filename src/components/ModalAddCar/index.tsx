import React, { useCallback, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { BeatLoader } from 'react-spinners';

import { useCar } from '../../hooks/car';

import Modal, { IModalProps } from '../Modal';
import Input from '../InputModal';

import { Form, beatLoaderStyles } from './styles';

interface IFormSubmitData {
  title: string;
  brand: string;
  price: string;
  age: number;
}

const ModalAddCar: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);

  const { addCar } = useCar();

  const handleSubmit = useCallback(
    async ({ title, brand, price, age }: IFormSubmitData) => {
      setLoading(true);

      const formattedPrice = price.split(/[!@#$%+*-.,\s]+/g).join('');

      await addCar({
        title,
        brand,
        price: formattedPrice,
        age,
      });

      setLoading(false);

      setIsOpen();
    },
    [setIsOpen, addCar]
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

          <span>
            {loading ? (
              <BeatLoader
                loading={loading}
                size={5}
                color="#fff"
                css={beatLoaderStyles}
              />
            ) : (
              <FiCheckSquare size={24} color="#fff" />
            )}
          </span>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddCar;
