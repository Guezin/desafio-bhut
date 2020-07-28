import React, { useCallback } from 'react';
import { FiTrash2, FiXSquare } from 'react-icons/fi';

import { useCar } from '../../hooks/car';

import Modal from '../Modal';

import {
  Content,
  ContainerButtons,
  DeleteButton,
  CancelButton,
} from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalDeleteCar: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const { deleteCar } = useCar();

  const handleDeleteCar = useCallback(async () => {
    deleteCar();

    setIsOpen();
  }, [setIsOpen, deleteCar]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Content>
        <h1>Realmente deseja excluir?</h1>

        <ContainerButtons>
          <CancelButton type="button">
            <p>Cancelar</p>

            <div>
              <FiXSquare size={24} color="#fff" />
            </div>
          </CancelButton>

          <DeleteButton type="button" onClick={handleDeleteCar}>
            <p>Excluir</p>

            <div>
              <FiTrash2 size={24} color="#fff" />
            </div>
          </DeleteButton>
        </ContainerButtons>
      </Content>
    </Modal>
  );
};

export default ModalDeleteCar;
