import React from "react";
import styled from "styled-components";
import MapArea from "../components/MapArea";
import Chart from "../components/Chart";


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


function StaticPage() {

  return (
    <InnerFrame>
      <Box>
        <Chart />
      </Box>
      <Box>
        <MapArea></MapArea>
      </Box>
    </InnerFrame>
  )
};

export default StaticPage;