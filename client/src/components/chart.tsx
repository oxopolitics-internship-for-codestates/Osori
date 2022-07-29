import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VictoryPie, VictoryLegend, VictoryChart, VictoryAxis, VictoryContainer } from 'victory';

//---- css ----
const ChartWrapper = styled.div`
  position: relative;
  display: grid;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
  gap: 20px;
  text-align: center;
`

const StaticTitle = styled.h2`
  margin-top: 65px;
`

//---- code ----
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];
const wantedGraphicData = [
  {x: '46%', y: 46},
  {x: '22%', y: 22},
  {x: '32%', y: 32}
];

function Chart() {
  const data = [
    { name: '네', symbol: { fill: '#9749B6' }},
    { name: '글쎄요', symbol: { fill: '#C1ADD1' } },
    { name: '아니오', symbol: { fill: '#EEA3BF' } }
  ];

  // 그래프 애니메이션
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setGraphicData(wantedGraphicData);
  }, [])

  return (
      <ChartWrapper>
        <StaticTitle>서울 전체 통계 요약</StaticTitle>
          <VictoryChart 
            width={400} 
            height={400}
            containerComponent={<VictoryContainer responsive={false} />}
          >
            
            <VictoryAxis
              style={{
                axis: {stroke: 'transparent'}, // x축
                ticks: {stroke: 'transparent'}, // y축
                tickLabels: {fill: 'transparent'}  // x축 라벨 안 보이게하기
              }}
            />
            
            <VictoryLegend
              x={300}
              y={150}
              title='범례'
              centerTitle
              orientation='vertical'
              gutter={{left: 5, right: 50}}
              borderPadding={{top: 10, bottom: 10}}
              style={{
                border: { stroke: '#878787' },
                title: { fontSize: 20 },
                labels: { fontSize: 12 }
              }}
              
              data={data}
            />

            <text x={185} y={205} fill="black">496 명</text>

            <VictoryPie
              animate={{easing: 'exp', duration: 500}}
              standalone={false}
              radius={50}
              colorScale={['#9749B6', '#C1ADD1', '#EEA3BF']}
              padAngle={1}
              innerRadius={100}
              labelRadius={({innerRadius}) => 100 * 0.6}
              labels={() => null}
              style={{
                labels: { fontSize: 15, fill: 'black' }
              }}
              data={graphicData}
            />
          </VictoryChart>
      </ChartWrapper>
  );
}

export default Chart;
