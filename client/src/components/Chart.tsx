import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import GenderResponseRate from './chart/GenderResponseRate';
import OverallResponseRate from './chart/OverallResponseRate';
import StaticsBox from './chart/StaticsBox';

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  height: 100vh;
  margin: 0;
  padding: 50px 20px 0 0;
  text-align: center;
  justify-content: space-around;
  align-items: center;
`

const StaticsTitle = styled.h2`

`

const StatsArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
`

interface ResProps {
  all_count?: number;
  all_response_rate_po?: string;
  all_response_rate_na?: string;
  all_response_rate_nu?: string;
  male_count_all?: number;
  male_count_po?: number;
  male_count_na?: number;
  male_count_nu?: number;
  female_count_all?: number;
  female_count_po?: number;
  female_count_na?: number;
  female_count_nu?: number;
}

function Chart() {
  const [responseData, setResponseData] = useState<ResProps>({})

  useEffect(() => {
    axios.get('http://localhost:4000/card/map',
    {
      headers: {'Content-Type': 'application.json' }
    })
    .then((res) => {
      setResponseData(res.data);
    })

  }, [])
  
  return (
    <ChartWrapper>
      <StaticsTitle>서울 전체 통계 요약</StaticsTitle>
        <StaticsBox resData={responseData} />
        <StatsArea>
          <OverallResponseRate />
          <GenderResponseRate />
        </StatsArea>
    </ChartWrapper>
  ); 
}

export default Chart;