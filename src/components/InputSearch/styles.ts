import styled from 'styled-components';

export const Container = styled.div`
  width: 286px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #fff;

  display: flex;

  > input {
    width: 100%;
    border: 0;
    font-size: 16px;
    text-transform: capitalize;

    &::placeholder {
      color: #aaa;
    }
  }

  svg {
    margin: 0 8px;
  }
`;
