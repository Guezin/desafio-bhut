import styled from 'styled-components';
import { shade } from 'polished';
import { css } from '@emotion/core';

export const Content = styled.div`
  height: 100%;
  padding: 16px 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 32px;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;

  button + button {
    margin-left: 32px;
  }
`;

export const DeleteButton = styled.button`
  border: 0;
  border-radius: 4px;
  background-color: #f43030;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;

  &:hover {
    background-color: ${shade(0.2, '#f43030')};

    span {
      background-color: ${shade(0.3, '#f43030')};
    }
  }

  p {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  span {
    width: 60px;
    height: 44px;
    padding: 0 16px;
    border-radius: 0 4px 4px 0;
    background-color: ${shade(0.2, '#f43030')};
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const CancelButton = styled.button`
  border: 0;
  border-radius: 4px;
  background-color: #b0b0b0;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;

  &:hover {
    background-color: ${shade(0.2, '#b0b0b0')};

    span {
      background-color: ${shade(0.3, '#b0b0b0')};
    }
  }

  p {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  span {
    width: 60px;
    height: 44px;
    padding: 0 16px;
    border-radius: 0 4px 4px 0;
    background-color: ${shade(0.2, '#b0b0b0')};
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
  }
`;

export const beatLoaderStyles = css`
  display: block;
  width: 100%;
`;
