import styled from "styled-components";

const Button = styled.button`
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
  background-color: purple;
  padding: 1.2rem 2.4rem;
  border-radius: 7px;
  border: none;
  transition: all 0.3s;
`;

const StyledApp = styled.div`
  background-color: orange;
  padding: 20px;
`;

function App() {
  return (
    <StyledApp>
      <h1>Hello World</h1>
      <Button>Check in</Button>
    </StyledApp>
  );
}

export default App;
