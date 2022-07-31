import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VictoryPie, VictoryLegend, VictoryChart, VictoryAxis, VictoryContainer, VictoryLabel, VictoryTooltip } from 'victory';

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

const Svg = styled.svg`
  position: absolute;
  z-index: -1;
`

const StaticsTitle = styled.h2`
  margin-top: 65px;
`

const DetailedStaticsTitle = styled.h3`
  margin-top: 50px;
`

//---- code ----
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];
const wantedGraphicData = [
  {x: '46%', y: 46},
  {x: '22%', y: 22},
  {x: '32%', y: 32}
];

function Chart() {
  const legend = [
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
        <StaticsTitle>서울 전체 통계 요약</StaticsTitle>
          <DetailedStaticsTitle>전체 응답률</DetailedStaticsTitle>
          <VictoryChart 
            width={400} 
            height={150}
          >
            <VictoryAxis
              style={{
                axis: {stroke: 'transparent'}, // x축
                ticks: {stroke: 'transparent'}, // y축
                tickLabels: {fill: 'transparent'}  // x축 라벨 안 보이게하기
              }}
            />
            <Svg viewBox='0 0 400 200'>
              <VictoryPie
                height={200}
                standalone={false}
                animate={{easing: 'exp', duration: 500}}
                radius={65}
                colorScale={['#9749B6', '#C1ADD1', '#EEA3BF']}
                padAngle={1}
                innerRadius={100}
                data={graphicData}
                labelComponent={<VictoryTooltip
                  x={200} y={120}
                  orientation="top"
                  pointerLength={0}
                  cornerRadius={45}
                  flyoutWidth={90}
                  flyoutHeight={90}
                  flyoutStyle={{ fill: 'white', stroke: 'none' }}
                  style={{ fontSize: 20 }}
                  />}
              />
              <VictoryLabel
                textAnchor={'middle'}
                style={{fontSize: 25}}
                x={200}
                y={100}
                text='496 명'
              />
            </Svg>
            <VictoryLegend
              x={300}
              y={30}
              title='범례'
              centerTitle
              orientation='vertical'
              gutter={{left: 5, right: 50}}
              borderPadding={{top: 5, bottom: 5}}
              style={{
                border: { stroke: '#878787' },
                title: { fontSize: 13 },
                labels: { fontSize: 10 }
              }}
              data={legend}
            />
          </VictoryChart>
      </ChartWrapper>
  );
}

export default Chart;
