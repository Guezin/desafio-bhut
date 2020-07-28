import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 18px 16px;
  border-radius: 4px;
  background-color: #fff;

  display: flex;

  input {
    width: 100%;
    border: 0;
    font-size: 18px;

    &::placeholder {
      color: #aaa;
    }
  }

  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
