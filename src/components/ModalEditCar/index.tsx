import React, { useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Modal from '../Modal';
import Input from '../InputModal';

import { Form } from './styles';

import { ICar } from '../Car';

interface IModalProps {
  isOpen: boolean;
  editingCar: ICar;
  setIsOpen: () => void;
}

const ModalEditCar: React.FC<IModalProps> = ({
  isOpen,
  editingCar,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    (data) => {
      console.log(data);

      setIsOpen();
    },
    [setIsOpen]
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

          <div>
            <FiCheckSquare size={24} color="#fff" />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditCar;
