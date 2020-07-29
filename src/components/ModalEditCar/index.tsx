import React, { useCallback, useRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { BeatLoader } from 'react-spinners';

import { useCar } from '../../hooks/car';

import Modal from '../Modal';
import Input from '../InputModal';

import { Form, beatLoaderStyles } from './styles';

import { ICar } from '../Car';

interface IModalProps {
  isOpen: boolean;
  editingCar: ICar;
  setIsOpen: () => void;
}

interface IFormSubmitData {
  title: string;
  brand: string;
  price: string;
  age: number;
}

const ModalEditCar: React.FC<IModalProps> = ({
  isOpen,
  editingCar,
  setIsOpen,
}) => {
  const [loading, setLoading] = useState(false);

  const { updateCar } = useCar();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async ({ title, brand, price, age }: IFormSubmitData) => {
      setLoading(true);

      const formattedPrice = price.split(/[!@#$%+*-.,\s]+/g).join('');

      await updateCar({
        _id: editingCar._id,
        title,
        brand,
        price: formattedPrice,
        age,
      });

      setLoading(false);

      setIsOpen();
    },
    [setIsOpen, editingCar._id, updateCar]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingCar}>
        <h1>Alterar informações</h1>

        <Input type="text" name="title" placeholder="Modelo" />
        <Input type="text" name="brand" placeholder="Marca" />
        <Input type="text" name="price" placeholder="Ex: 30.000" />
        <Input type="number" name="age" placeholder="Ano" />

        <button type="submit">
          <p>Confirmar</p>

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

export default ModalEditCar;
