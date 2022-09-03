import React, { useState } from 'react';
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

// ---- code ----
// interface Gender {
// 	count: number;
// 	age: Age;
// 	yes: number;
// 	no: number;
// 	so: number;
// }

// interface Age {
// 	[key: string]: number;
// }

interface ResponseRegionData {
	issueId: string;
	mapName: string;
	regionName: string;
	count: number;
	male: Gender;
	female: Gender;
}

interface Answer {
	yes: number;
	no: number;
	so: number;
}

interface Gender {
	count: number;
	answer: Answer;
	age: Age;
}
interface Age {
	count: number;
	[key: string]: number;
}

interface SubData {
	name: string;
	count: number;
	male: Gender;
	female: Gender;
}

function Chart({ region, selectIssue, chartData }: { region: string; selectIssue: string; chartData: SubData }) {
	const [responseData, setResponseData] = useState<SubData>(chartData);
	const [isGetRegion, setIsGetRegion] = useState('');

	if (isGetRegion !== region) {
		setResponseData(chartData);
		setIsGetRegion(region);
	}

	// 전체 응답 데이터
	const overallResData = {
		total: responseData.count,
		yes: responseData.female.answer.yes + responseData.male.answer.yes,
		no: responseData.female.answer.no + responseData.male.answer.no,
		so: responseData.female.answer.so + responseData.male.answer.so,
	};
	// 남녀 응답 데이터
	const genderData = {
		male: {
			count: responseData.male.count,
			yes: responseData.male.answer.yes,
			no: responseData.male.answer.no,
			so: responseData.male.answer.so,
		},
		female: {
			count: responseData.female.count,
			yes: responseData.female.answer.yes,
			no: responseData.female.answer.no,
			so: responseData.female.answer.so,
		},
	};
	// 여성 세부 데이터 추출
	const femaleAge = responseData.female.age;
	let femaleMaxAge = 0;
	let femaleAgeLabel = '없음';
	for (const i in femaleAge) {
		if (i !== 'count' && femaleAge[i] > femaleMaxAge) {
			femaleMaxAge = femaleAge[i];
			femaleAgeLabel = i;
		}
	}
	// 남성 세부 데이터 추출
	const maleAge = responseData.male.age;
	let maleMaxAge = 0;
	let maleAgeLabel = '없음';
	for (const i in maleAge) {
		if (i !== 'count' && maleAge[i] > maleMaxAge) {
			maleMaxAge = maleAge[i];
			maleAgeLabel = i;
		}
	}

	// 남녀 전체 응답 데이터(최다연령대 포함)
	const genderResData = {
		female: responseData.female.count,
		male: responseData.male.count,
		femaleMaxAgeCnt: femaleMaxAge,
		femaleMaxAgeLabel: femaleAgeLabel,
		maleMaxAgeCnt: maleMaxAge,
		maleMaxAgeLabel: maleAgeLabel,
	};

	return (
		<ChartWrapper>
			<StaticsTitle>{`${region} 전체 통계 요약`}</StaticsTitle>
			<StaticsBox genderResData={genderResData} />
			<StatsArea>
				<OverallResponseRate overallResData={overallResData} />
				<GenderResponseRate genderData={genderData} />
			</StatsArea>
		</ChartWrapper>
	);
}

export default Chart;
