import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const InputModal: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <Container>
      <input {...rest} />
    </Container>
  );
};

export default InputModal;
