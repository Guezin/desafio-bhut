import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > h1 {
    margin-top: 32px;
    color: #fff;
    font-size: 54px;
  }

  > section {
    margin: 32px 0 32px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      border: 0;
      border-radius: 4px;
      transition: background-color 0.2s;

      background-color: #00cb76;

      &:hover {
        background-color: ${shade(0.2, '#00cb76')};
      }
    }
  }
`;

export const ContentSearch = styled.div`
  width: 380px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Separator = styled.div`
  border-left: 2px solid #fff;
  height: 24px;
`;

export const ContainerPagingButtons = styled.div`
  display: flex;
  justify-content: center;
`;
