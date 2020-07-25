import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    font-family: 'Roboto', sans-serif;
  }

  body {
    width: 100vw;
    height: 100vh;
    background-color: #7159c1;

    display: flex;
    justify-content: center;

  }

  #root {
    width: 1120px;

  }

  h1, h2, h3 {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

`;
