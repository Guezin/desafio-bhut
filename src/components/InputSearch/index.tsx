import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<IconBaseProps>;
}

const InputSearch: React.FC<InputSearchProps> = ({ icon: Icon, ...rest }) => {
  return (
    <Container>
      <input {...rest} />

      <Icon size={20} color="#aaa" />
    </Container>
  );
};

export default InputSearch;
