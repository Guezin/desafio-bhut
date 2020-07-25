import React from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import Modal, { IModalProps } from '../Modal';
import Input from '../InputModal';

import { Form } from './styles';

const ModalAddCar: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={() => {}}>
        <h1>Adicionar carro</h1>

        <Input type="text" name="title" placeholder="Modelo" />
        <Input type="text" name="brand" placeholder="Marca" />
        <Input type="text" name="price" placeholder="Ex: 30.000" />
        <Input type="number" name="age" placeholder="Ano" />

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
