import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VictoryPie, VictoryLegend, VictoryLabel, VictoryTooltip, LineSegment } from 'victory';

const Svg = styled.svg``;

// ---- code ----
interface Gender {
	count: number;
	yes: number;
	no: number;
	so: number;
}

interface GenderData {
	female: Gender;
	male: Gender;
}

const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];

function GenderResponseRate({ genderData }: { genderData: GenderData }) {
	const legend = [
		{ name: '네', symbol: { fill: '#9749B6' } },
		{ name: '글쎄요', symbol: { fill: '#C1ADD1' } },
		{ name: '아니오', symbol: { fill: '#EEA3BF' } },
	];

	const [maleResponseRate, setMaleResponseRate] = useState<{ [key: string]: number | string }[]>(defaultGraphicData);
	const [femaleResponseRate, setFemaleResponseRate] =
		useState<{ [key: string]: number | string }[]>(defaultGraphicData);
	const [maCount, setMaCount] = useState(0);
	const [feCount, setFeCount] = useState(0);

	useEffect(() => {
		// 남성 응답 데이터 추출
		let yes = `${((100 * genderData.male.yes) / genderData.male.count).toFixed(2)}%`;
		let no = `${((100 * genderData.male.no) / genderData.male.count).toFixed(2)}%`;
		let so = `${((100 * genderData.male.so) / genderData.male.count).toFixed(2)}%`;
		const maleResponseData = [
			{ x: yes, y: genderData.male.yes },
			{ x: so, y: genderData.male.so },
			{ x: no, y: genderData.male.no },
		];

		// 여성 응답 데이터 추출
		yes = `${((100 * genderData.female.yes) / genderData.female.count).toFixed(2)}%`;
		no = `${((100 * genderData.female.no) / genderData.female.count).toFixed(2)}%`;
		so = `${((100 * genderData.female.so) / genderData.female.count).toFixed(2)}%`;
		const femaleResponseData = [
			{ x: yes, y: genderData.female.yes },
			{ x: so, y: genderData.female.so },
			{ x: no, y: genderData.female.no },
		];
		setMaCount(genderData.male.count);
		setFeCount(genderData.female.count);
		setMaleResponseRate(maleResponseData);
		setFemaleResponseRate(femaleResponseData);
	}, [genderData]);

	return (
		<Svg viewBox="0 0 300 300">
			<VictoryLabel
				textAnchor="middle"
				style={{ fontSize: 14 }}
				x={150}
				y={165}
				text={`남 ${maCount} 명\n여 ${feCount} 명`}
			/>
			<VictoryPie
				name="여성"
				standalone={false}
				animate={{ easing: 'exp', duration: 500 }}
				radius={40}
				innerRadius={60}
				origin={{ x: 150, y: 165 }}
				colorScale={['#9749B6', '#C1ADD1', '#EEA3BF']}
				padAngle={1}
				data={femaleResponseRate}
				labelComponent={
					<VictoryTooltip
						renderInPortal={false}
						center={{ x: 150, y: 165 }}
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
			<VictoryPie
				name="남성"
				standalone={false}
				animate={{ easing: 'exp', duration: 500 }}
				data={maleResponseRate}
				radius={70}
				innerRadius={90}
				origin={{ x: 150, y: 165 }}
				padAngle={1}
				colorScale={['#9749B6', '#C1ADD1', '#EEA3BF']}
				startAngle={20}
				endAngle={380}
				labelComponent={
					<VictoryTooltip
						renderInPortal={false}
						center={{ x: 150, y: 165 }}
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
			<VictoryLabel textAnchor="middle" style={{ fontSize: 14 }} x={100} y={140} text="여성" />
			<VictoryLabel textAnchor="middle" style={{ fontSize: 14 }} x={85} y={110} text="남성" />
			<VictoryLegend
				standalone={false}
				x={45}
				y={0}
				title="남녀 전체 응답률"
				centerTitle
				orientation="horizontal"
				gutter={{ left: 5, right: 35 }}
				borderPadding={{ top: 20, bottom: 0 }}
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

export default GenderResponseRate;
