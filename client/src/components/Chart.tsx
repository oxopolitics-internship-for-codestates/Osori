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

const StaticsTitle = styled.h2`
  margin-top: 65px;
`

const DetailedStaticsTitle = styled.h3`
  margin-top: 70px;
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
            height={400}
            // containerComponent={<VictoryContainer responsive={false} />}
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
              y={10}
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

            <VictoryPie
              standalone={false}
              animate={{easing: 'exp', duration: 500}}
              radius={45}
              colorScale={['#9749B6', '#C1ADD1', '#EEA3BF']}
              padAngle={1}
              innerRadius={70}
              labelRadius={({innerRadius}) => 100 * 0.6}
              data={graphicData}
              // labels={() => null}
              // labels={({data}) => data.map((rate: {x:string, y:number}) => {
              //   return `y:${rate.x}`
              // })}  // 데이터 type 체크해서 수정하기!
              labelComponent={<VictoryTooltip
                x={200} y={245}
                orientation="top"
                pointerLength={0}
                cornerRadius={45}
                flyoutWidth={90}
                flyoutHeight={90}
                flyoutStyle={{ fill: 'white', stroke: 'none' }}
                style={{ fontSize: 20 }}
                />}
              
              // style={{
              //   labels: { fontSize: 15, fill: '#7C7C7C' }
              // }}
            />
            <VictoryLabel
              textAnchor={'middle'}
              style={{fontSize: 20}}
              x={200}
              y={200}
              text='496 명'
            />
          </VictoryChart>
      </ChartWrapper>
  );
}

export default Chart;
