import styled, { css } from 'styled-components';

interface ContainerProps {
  selected: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 32px;
  height: 32px;
  margin-top: 32px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.selected &&
    css`
      border: 2px solid #fff;
      background-color: #7159c1;

      button {
        color: #fff;
      }
    `};

  &:hover {
    border: 2px solid #fff;
    background-color: #7159c1;

    button {
      color: #fff;
    }
  }

  & + div {
    margin-left: 8px;
  }
`;

export const Button = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  border: 0;
  background-color: transparent;
`;
