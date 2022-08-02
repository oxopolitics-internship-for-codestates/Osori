import React from "react";
import styled from "styled-components";
import LoadingPage from './pages/LoadingPage';
import StaticPage from './pages/StaticPage';

const Frame = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;


function App() {
  return (
    <Frame>

      {false ? <LoadingPage /> : <StaticPage />}

    </Frame>
  );
}

export default App;
