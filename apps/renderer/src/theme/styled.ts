import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
      overflow: hidden;
    }
    body {
        background-color: ${(props) => props.theme.colors.background};
    }
    /* Legacy styles from lists.styl */
    ul {
      font-size: 1rem;
      line-height: 1.6;
      font-weight: 400;
      margin: 2rem 0 1rem;
      padding: 0;
      margin: 1em;
      list-style-type: none;
      list-style-image: none;
    }
`;
