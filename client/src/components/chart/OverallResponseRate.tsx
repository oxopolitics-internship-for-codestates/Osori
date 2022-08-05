import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VictoryPie, VictoryLegend, VictoryLabel, VictoryTooltip, VictoryAnimation } from 'victory';

const Svg = styled.svg``;

//---- code ----
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];

interface statData {
  total: number;
  yes: number;
  no: number;
  so: number;
}

function OverallResponseRate({ statData }: { statData: statData }) {
  const legend = [
    { name: '네', symbol: { fill: '#9749B6' } },
    { name: '글쎄요', symbol: { fill: '#C1ADD1' } },
    { name: '아니오', symbol: { fill: '#EEA3BF' } },
  ];

  const [overallResponse, setOverallResponse] = useState<
    { [key: string]: number | string }[]>([]);
  const [count, setCount] = useState(0);
  const [change, setChange] = useState(false);

  // overallResponse의 상태가 변하고 change가 true일 때 얻고자 하는 overallResponse 상태로 바꾸기
  useEffect(() => {
    if (change) {
      // 전체 응답 데이터 추출
      let yes = ((100 * statData.yes) / statData.total).toFixed(2) + '%',
        no = ((100 * statData.no) / statData.total).toFixed(2) + '%',
        so = ((100 * statData.so) / statData.total).toFixed(2) + '%';
      const overallResponseData = [
        { x: yes, y: statData.yes },
        { x: so, y: statData.so },
        { x: no, y: statData.no },
      ];
      // 애니메이션 실행 속도 늦추기
      setTimeout(() => {
        setOverallResponse(overallResponseData);
      }, 60);

      setChange(false);
    }
  }, [overallResponse]);

  // change가 true일 때, defaultGraphicData로 상태 바꾸기
  useEffect(() => {
    if (change) {
      setOverallResponse(defaultGraphicData);
    }
  }, [change]);

  // 부모에게서 받은 statData를 감지. defaultGraphicData를 받기 위한 change 준비.
  useEffect(() => {
    setChange(true);
    setCount(statData.total);
  }, [statData]);

  return (
    <>
      <Svg viewBox="0 0 300 250">
        <VictoryLabel
          textAnchor={'middle'}
          style={{ fontSize: 16 }}
          x={150}
          y={160}
          text={`${count} 명`}
        />
        <VictoryPie
          standalone={false}
          animate={{ easing: 'exp', duration: 700 }}
          radius={60}
          innerRadius={90}
          origin={{ x: 150, y: 160 }}
          colorScale={['#9749B6', '#C1ADD1', '#EEA3BF']}
          padAngle={1}
          data={overallResponse}
          labelComponent={
            <VictoryTooltip
              renderInPortal={false}
              center={{ x: 150, y: 160 }}
              orientation="top"
              pointerLength={0}
              cornerRadius={40}
              flyoutWidth={80}
              flyoutHeight={80}
              flyoutStyle={{ fill: 'white', stroke: 'none' }}
              style={{ fontSize: 16 }}
            />
          }
        />

        <VictoryLegend
          standalone={false}
          x={45}
          y={0}
          title="전체 응답률"
          centerTitle
          orientation="horizontal"
          gutter={{ left: 5, right: 35 }}
          borderPadding={{ top: 15 }}
          style={{
            border: { stroke: 'none' },
            title: { fontSize: 15, fontWeight: 700 },
            labels: { fontSize: 10 },
          }}
          data={legend}
        />
      </Svg>
    </>
  );
}

export default OverallResponseRate;
