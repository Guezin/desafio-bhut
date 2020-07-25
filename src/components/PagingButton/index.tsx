import React, { ButtonHTMLAttributes } from 'react';

import { Container, Button } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  onClick: () => void;
}

const PagingButton: React.FC<ButtonProps> = ({
  selected,
  onClick,
  children,
  ...rest
}) => (
  <Container selected={selected} onClick={onClick}>
    <Button {...rest}>{children}</Button>
  </Container>
);

export default PagingButton;
