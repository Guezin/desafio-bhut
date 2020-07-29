import React, { useCallback, useState } from 'react';
import { FiTrash2, FiXSquare } from 'react-icons/fi';
import { BeatLoader } from 'react-spinners';

import { useCar } from '../../hooks/car';

import Modal from '../Modal';

import {
  Content,
  ContainerButtons,
  DeleteButton,
  CancelButton,
  beatLoaderStyles,
} from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalDeleteCar: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);

  const { deleteCar } = useCar();

  const handleDeleteCar = useCallback(async () => {
    setLoading(true);

    await deleteCar();

    setLoading(false);

    setIsOpen();
  }, [setIsOpen, deleteCar]);

  const handleCancelModal = useCallback(() => {
    setIsOpen();
  }, [setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Content>
        <h1>Realmente deseja excluir?</h1>

        <ContainerButtons>
          <CancelButton type="button" onClick={handleCancelModal}>
            <p>Cancelar</p>

            <span>
              <FiXSquare size={24} color="#fff" />
            </span>
          </CancelButton>

          <DeleteButton type="button" onClick={handleDeleteCar}>
            <p>Excluir</p>

            <span>
              {loading ? (
                <BeatLoader
                  loading={loading}
                  size={5}
                  color="#fff"
                  css={beatLoaderStyles}
                />
              ) : (
                <FiTrash2 size={24} color="#fff" />
              )}
            </span>
          </DeleteButton>
        </ContainerButtons>
      </Content>
    </Modal>
  );
};

export default ModalDeleteCar;
