import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VictoryPie, VictoryLegend, VictoryLabel, VictoryTooltip } from 'victory';

const Svg = styled.svg``;

// ---- code ----
interface answer {
	yes: number;
	no: number;
	so: number;
}

interface gender {
	count: number;
	answer: answer;
}

interface subData {
	name: string;
	count: number;
	male: gender;
	female: gender;
}

const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];

function GenderResponseRate({ statData }: { statData: subData }) {
	const legend = [
		{ name: '네', symbol: { fill: '#9749B6' } },
		{ name: '글쎄요', symbol: { fill: '#C1ADD1' } },
		{ name: '아니오', symbol: { fill: '#EEA3BF' } },
	];

	const [maleResponseRate, setMaleResponseRate] = useState<{ [key: string]: number | string }[]>([]);
	const [femaleResponseRate, setFemaleResponseRate] = useState<{ [key: string]: number | string }[]>([]);
	const [maCount, setMaCount] = useState(0);
	const [feCount, setFeCount] = useState(0);
	const [change, setChange] = useState(false);

	useEffect(() => {
		console.log('3');
		if (change) {
			// 남성 응답 데이터 추출
			let yes = `${((100 * statData.male.answer.yes) / statData.male.count).toFixed(2)}%`;
			let no = `${((100 * statData.male.answer.no) / statData.male.count).toFixed(2)}%`;
			let so = `${((100 * statData.male.answer.so) / statData.male.count).toFixed(2)}%`;
			const maleResponseData = [
				{ x: yes, y: statData.male.answer.yes },
				{ x: so, y: statData.male.answer.so },
				{ x: no, y: statData.male.answer.no },
			];

			// 여성 응답 데이터 추출
			yes = `${((100 * statData.female.answer.yes) / statData.female.count).toFixed(2)}%`;
			no = `${((100 * statData.female.answer.no) / statData.female.count).toFixed(2)}%`;
			so = `${((100 * statData.female.answer.so) / statData.female.count).toFixed(2)}%`;
			const femaleResponseData = [
				{ x: yes, y: statData.female.answer.yes },
				{ x: so, y: statData.female.answer.so },
				{ x: no, y: statData.female.answer.no },
			];
			setTimeout(() => {
				setMaleResponseRate(maleResponseData);
				setFemaleResponseRate(femaleResponseData);
			}, 50);

			setChange(false);
		}
	}, [maleResponseRate, femaleResponseRate]);

	useEffect(() => {
		console.log('2');
		if (change) {
			setMaleResponseRate(defaultGraphicData);
			setFemaleResponseRate(defaultGraphicData);
		}
	}, [change]);

	useEffect(() => {
		console.log('1');
		setChange(true);
		setMaCount(statData.male.count);
		setFeCount(statData.female.count);
	}, [statData]);

	// useEffect(() => {
	//   // 남성 응답 데이터 추출
	//   let yes = ((100 * statData.male.answer.yes) / statData.male.count).toFixed(2) + '%',
	//     no = ((100 * statData.male.answer.no) / statData.male.count).toFixed(2) + '%',
	//     so = ((100 * statData.male.answer.so) / statData.male.count).toFixed(2) + '%';
	//   const MaleResponseData = [
	//     { x: yes, y: statData.male.answer.yes },
	//     { x: so, y: statData.male.answer.so },
	//     { x: no, y: statData.male.answer.no },
	//   ];

	//   // 여성 응답 데이터 추출
	//   yes = ((100 * statData.female.answer.yes) / statData.female.count).toFixed(2) + '%';
	//   no = ((100 * statData.female.answer.no) / statData.female.count).toFixed(2) + '%';
	//   so = ((100 * statData.female.answer.so) / statData.female.count).toFixed(2) + '%';
	//   const FemaleResponseData = [
	//     { x: yes, y: statData.female.answer.yes },
	//     { x: so, y: statData.female.answer.so },
	//     { x: no, y: statData.female.answer.no },
	//   ];

	//   setMaleResponseRate(MaleResponseData);
	//   setFemaleResponseRate(FemaleResponseData);
	//   setMaCount(statData.male.count);
	//   setFeCount(statData.female.count);
	// }, []);

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
				animate={{ easing: 'exp', duration: 700 }}
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
