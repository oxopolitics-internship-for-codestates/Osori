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
interface Gender {
	count: number;
	age: Age;
	yes: number;
	no: number;
	so: number;
}

interface Age {
	[key: string]: number;
}

interface ResponseRegionData {
	issueId: string;
	mapName: string;
	regionName: string;
	count: number;
	male: Gender;
	female: Gender;
}

function Chart({ region, selectIssue }: { region: string; selectIssue: string }) {
	const [responseData, setResponseData] = useState<ResponseRegionData>({
		issueId: '',
		mapName: '',
		regionName: '',
		count: 0,
		male: {
			count: 0,
			yes: 0,
			no: 0,
			so: 0,
			age: {},
		},
		female: {
			count: 0,
			yes: 0,
			no: 0,
			so: 0,
			age: {},
		},
	});
	const [isGetRegion, setIsGetRegion] = useState('');

	if (isGetRegion !== region) {
		axios
			.get(`${process.env.REACT_APP_SERVER_URI}stats/region/${selectIssue}/${region}`, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((res) => {
				setResponseData({ ...res.data[0] });
				setIsGetRegion(region);
			});
	}

	// 전체 응답 데이터
	const overallResData = {
		total: responseData.count,
		yes: responseData.female.yes + responseData.male.yes,
		no: responseData.female.no + responseData.male.no,
		so: responseData.female.so + responseData.male.so,
	};
	// 남녀 응답 데이터
	const genderData = {
		male: {
			count: responseData.male.count,
			yes: responseData.male.yes,
			no: responseData.male.no,
			so: responseData.male.so,
		},
		female: {
			count: responseData.female.count,
			yes: responseData.female.yes,
			no: responseData.female.no,
			so: responseData.female.so,
		},
	};
	// 여성 세부 데이터 추출
	const femaleAge = responseData.female.age;
	let femaleMaxAge = 0;
	let femaleAgeLabel = '';
	for (const i in femaleAge) {
		if (femaleAge[i] > femaleMaxAge) {
			femaleMaxAge = femaleAge[i];
			femaleAgeLabel = i;
		}
	}
	// 남성 세부 데이터 추출
	const maleAge = responseData.male.age;
	let maleMaxAge = 0;
	let maleAgeLabel = '';
	for (const i in maleAge) {
		if (maleAge[i] > maleMaxAge) {
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
