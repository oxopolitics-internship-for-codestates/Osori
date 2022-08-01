import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VictoryPie, VictoryLegend, VictoryChart, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';


const Svg = styled.svg`

`

const DetailedStaticsTitle = styled.h3`
  margin-top: 40px;
`

//---- code ----
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];
const overallResponseData = [
  {x: '46%', y: 46},
  {x: '22%', y: 22},
  {x: '32%', y: 32}
];
  
  function OverallResponseRate() {
    const legend = [
      { name: '네', symbol: { fill: '#9749B6' }},
      { name: '글쎄요', symbol: { fill: '#C1ADD1' } },
      { name: '아니오', symbol: { fill: '#EEA3BF' } }
    ];
  
    // 그래프 애니메이션
    const [overallResponse, setOverallResponse] = useState(defaultGraphicData);
    
    useEffect(() => {
      setOverallResponse(overallResponseData);
    }, [])
  
    return (
      <>
      {/* <DetailedStaticsTitle>전체 응답률</DetailedStaticsTitle> */}
        <Svg viewBox='0 0 300 300'>
          <VictoryLabel
              textAnchor={'middle'}
              style={{fontSize: 16}}
              x={150}
              y={150}
              text={'496 명'}
            />
          <VictoryPie
            standalone={false}
            animate={{easing: 'exp', duration: 500}}
            radius={40}
            innerRadius={60}
            origin={{x: 150, y: 150}}
            colorScale={['#9749B6', '#C1ADD1', '#EEA3BF']}
            padAngle={1}
            data={overallResponse}
            labelComponent={<VictoryTooltip
              center={{ x: 150, y: 150 }}
              orientation="top"
              pointerLength={0}
              cornerRadius={40}
              flyoutWidth={80}
              flyoutHeight={80}
              flyoutStyle={{ fill: 'white', stroke: 'none' }}
              style={{ fontSize: 16 }}
            />}
          />
          
          <VictoryLegend
            standalone={false}
            x={45}
            y={0}
            title='전체 응답률'
            centerTitle
            orientation='horizontal'
            gutter={{left: 5, right: 35}}
            borderPadding={{top: 15, bottom: 20}}
            style={{
              border: { stroke: 'none' },
              title: { fontSize: 15, fontWeight: 700 },
              labels: { fontSize: 10 }
            }}
            data={legend}
          />
        </Svg>
        </>
    )
  };

  export default OverallResponseRate;