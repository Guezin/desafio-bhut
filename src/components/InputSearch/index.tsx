import React, { InputHTMLAttributes } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const InputSearch: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <Container>
      <input {...rest} />

      <FiSearch size={20} color="#aaa" />
    </Container>
  );
};

export default InputSearch;
