import TodoList from "./components/TodoList";
import GlobalStyle from "./styles/GlobalStyle";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #445055;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <TodoList />
      </AppContainer>
    </>
  );
}

export default App;
