import React from "react";
import styled from "styled-components";
import MapArea from "./components/MapArea";

const Frame = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerFrame = styled.div`
  height: 100%;
  max-width: 1200px;
  width: 100%;
  display: flex;
`;
const Box = styled.div`
  width: 50%;
  height: 100%;
`;

function App() {
  return (
    <Frame>
      <InnerFrame>
        <Box></Box>
        <Box>
          <MapArea></MapArea>
        </Box>
      </InnerFrame>
    </Frame>
  );
}

export default App;
