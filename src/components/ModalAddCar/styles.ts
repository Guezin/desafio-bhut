import styled from 'styled-components';
import { Form as Unform } from '@unform/web';
import { shade } from 'polished';
import { css } from '@emotion/core';

export const Form = styled(Unform)`
  padding: 16px 40px;
  display: flex;
  flex-direction: column;

  div + div {
    margin-top: 12px;
  }

  h1 {
    font-weight: 500;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 32px;
  }

  button {
    margin-top: 48px;
    align-self: flex-end;
  }

  button {
    border: 0;
    border-radius: 4px;
    background-color: #00cb76;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      background-color: ${shade(0.2, '#00cb76')};

      span {
        background-color: ${shade(0.3, '#00cb76')};
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
      background-color: ${shade(0.2, '#00cb76')};
      transition: background-color 0.2s;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const beatLoaderStyles = css`
  display: block;
  width: 100%;
  margin-bottom: 6px;
`;
