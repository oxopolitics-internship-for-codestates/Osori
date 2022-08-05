import React, { useEffect, useState } from 'react';
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
`;

const StaticsTitle = styled.h2``;

const StatsArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
`;

// interface ResProps {
//   all_count?: number;
//   all_response_rate_po?: string;
//   all_response_rate_na?: string;
//   all_response_rate_nu?: string;
//   male_count_all?: number;
//   male_count_po?: number;
//   male_count_na?: number;
//   male_count_nu?: number;
//   female_count_all?: number;
//   female_count_po?: number;
//   female_count_na?: number;
//   female_count_nu?: number;
// }

interface answer {
  yes: number;
  no: number;
  so: number;
}

interface gender {
  count: number;
  answer: answer;
  age: age;
}

interface age {
  count: number;
  [key: string]: number;
}

interface subData {
  name: string;
  count: number;
  male: gender;
  female: gender;
}

function Chart({ region, mdata }: { region: string; mdata: subData }) {
  // const [responseData, setResponseData] = useState<ResProps>({});

  // console.log(mdata);
  let data1 = {
    total: mdata.count,
    yes: mdata.female.answer.yes + mdata.male.answer.yes,
    no: mdata.female.answer.no + mdata.male.answer.no,
    so: mdata.female.answer.so + mdata.male.answer.so,
  };
  let fage = mdata.female.age;
  let femax = 0,
    felabel = '';
  for (let i in fage) {
    if (i !== 'count') {
      if (fage[i] > femax) {
        femax = fage[i];
        felabel = i;
      }
    }
  }
  let mage = mdata.male.age;
  let memax = 0,
    melabel = '';
  for (let i in mage) {
    if (i !== 'count') {
      if (mage[i] > memax) {
        memax = mage[i];
        melabel = i;
      }
    }
  }
  let data2 = {
    female: mdata.female.count,
    male: mdata.male.count,
    femaxc: femax,
    femaxl: felabel,
    memaxc: memax,
    memaxl: melabel,
  };

  return (
    <ChartWrapper>
      <StaticsTitle>{`${region} 전체 통계 요약`}</StaticsTitle>
      <StaticsBox newData={data2} />
      <StatsArea>
        <OverallResponseRate statData={data1} />
        <GenderResponseRate statData={mdata} />
      </StatsArea>
    </ChartWrapper>
  );
}

export default Chart;
