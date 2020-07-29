import styled from 'styled-components';

export const Container = styled.div`
  padding: 12px 32px;
  border-radius: 6px;
  background-color: #fff;

  header {
    h1 {
      font-size: 28px;
      font-weight: 500;
    }
  }

  & + div {
    margin-top: 16px;
  }
`;

export const Content = styled.div`
  padding: 8px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  section {
    display: flex;

    P {
      font-size: 18px;
      span {
        margin-left: 4px;
      }
    }

    p + p {
      margin-left: 32px;
    }
  }

  > div {
    position: relative;
    bottom: 16px;
  }
`;

export const EditButton = styled.button`
  padding: 8px;
  border: 0;
  border-radius: 6px;

  background-color: #0f82ed;
`;

export const DeleteButton = styled.button`
  padding: 8px;
  margin-left: 8px;
  border: 0;
  border-radius: 6px;

  background-color: #f43030;
`;
