import styled, { css } from 'styled-components';
import { lighten } from 'polished';

interface IContenrProps {
  activated: boolean;
}

interface IBrandProps {
  selected: boolean;
}

export const Container = styled.div`
  position: relative;

  button {
    border: none;
    background-color: transparent;
  }

  svg {
    cursor: pointer;
  }
`;

export const Content = styled.div<IContenrProps>`
  padding: 16px 0;
  position: absolute;
  top: 40px;
  left: -12px;
  border-radius: 6px;
  background-color: #f0f0f5;

  ${props =>
    props.activated
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `};

  flex-direction: column;
  align-items: flex-start;

  &::before {
    content: '';
    border-style: solid;
    border-color: #f0f0f5 transparent;
    border-width: 0 6px 6px 6px;
    bottom: 100%;
    position: absolute;
    left: 13%;
    transform: translateX(-50%);
  }
`;

export const Brand = styled.div<IBrandProps>`
  width: 100%;
  padding: 8px 20px;

  display: flex;
  align-items: center;

  button {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: ${props => (props.selected ? '#f43030' : '#d3d3d3')};
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;

    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      border: 2px solid #7159c1;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.2s;

      background-color: ${props =>
        props.selected ? '#00cb76' : 'transparent'};
    }
  }

  & + div {
    margin-top: 8px;
  }

  &:hover {
    background-color: ${lighten(0.3, '#7159C1')};
  }
`;
