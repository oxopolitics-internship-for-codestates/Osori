import React from 'react';
import styled from 'styled-components';

import GenderResponseRate from './chart/GenderResponseRate';
import OverallResponseRate from './chart/OverallResponseRate';
import StaticsBox from './chart/StaticsBox';

const ChartWrapper = styled.div`
  position: relative;
  display: grid;
  max-width: 500px;
  margin: 0;
  padding: 0 20px;
  gap: 10px;
  text-align: center;
  justify-content: center;
`

const StaticsTitle = styled.h2`
  margin-top: 65px;
`

function Chart() {
  
  return (
    <ChartWrapper>
      <StaticsTitle>서울 전체 통계 요약</StaticsTitle>
        <StaticsBox />
        <OverallResponseRate />
        <GenderResponseRate />
    </ChartWrapper>
  );
}

export default Chart;