import "./App.css";
import Home from "./Pages/Home";
import styled from "styled-components";
function App() {
  return (
    <Container>
      {/* <Navbar /> */}
      <div className="App">
        <header className="App-header">
          <Home />
        </header>
      </div>
    </Container>
  );
}
const Container = styled.div`
`;

export default App;
