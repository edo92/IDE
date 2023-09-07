import styled, { ThemeProvider as ThemeWrapper } from 'styled-components';
import { GlobalStyle } from './styled';
import { theme } from './theme';

const Wrapper = styled.div`
  position: relative;
  margin: 0px auto;
  min-height: 95vh;
  display: flex;
  flex-flow: column;
`;

const Container = styled.div`
  display: flex;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Main = styled.main`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  overflow: visible;
  width: 100%;
  flex-grow: 1;
`;

interface Props {
  children: JSX.Element;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <ThemeWrapper theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <Inner>
            <Main>{children}</Main>
          </Inner>
        </Container>
      </Wrapper>
    </ThemeWrapper>
  );
};
