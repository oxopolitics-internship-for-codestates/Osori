import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VictoryPie, VictoryLegend, VictoryLabel, VictoryTooltip } from 'victory';

const Svg = styled.svg``;

// ---- code ----
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];

interface OverallResData {
	total: number;
	yes: number;
	no: number;
	so: number;
}

function OverallResponseRate({ overallResData }: { overallResData: OverallResData }) {
	const legend = [
		{ name: '네', symbol: { fill: '#9749B6' } },
		{ name: '글쎄요', symbol: { fill: '#C1ADD1' } },
		{ name: '아니오', symbol: { fill: '#EEA3BF' } },
	];

	const [overallResponse, setOverallResponse] = useState<{ [key: string]: number | string }[]>(defaultGraphicData);
	const [count, setCount] = useState(0);

	useEffect(() => {
		// 전체 응답 데이터 추출
		let yes = Number(((100 * overallResData.yes) / overallResData.total).toFixed(2));
		let no = Number(((100 * overallResData.no) / overallResData.total).toFixed(2));
		let so = Number(((100 * overallResData.so) / overallResData.total).toFixed(2));
		if (overallResData.total === 0) {
			yes = 0;
			no = 1;
			so = 0;
		}

		const overallResponseData = [
			{ x: `${yes}%`, y: yes },
			{ x: `${so}%`, y: so },
			{ x: `${no}%`, y: no },
		];
		setCount(overallResData.total);
		setOverallResponse(overallResponseData);
	}, [overallResData]);

	return (
		<Svg viewBox="0 0 300 250">
			<VictoryLabel textAnchor="middle" style={{ fontSize: 16 }} x={150} y={160} text={`${count} 명`} />
			<VictoryPie
				standalone={false}
				animate={{ easing: 'exp', duration: 500 }}
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
	);
}

export default OverallResponseRate;
