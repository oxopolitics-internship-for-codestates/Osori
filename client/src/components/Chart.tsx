import React from 'react';
import styled from 'styled-components';

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

function Chart({ region, mdata }: { region: string; mdata: SubData }) {
	// const [responseData, setResponseData] = useState<ResProps>({});

	// console.log(mdata);
	const data1 = {
		total: mdata.count,
		yes: mdata.female.answer.yes + mdata.male.answer.yes,
		no: mdata.female.answer.no + mdata.male.answer.no,
		so: mdata.female.answer.so + mdata.male.answer.so,
	};
	const fage = mdata.female.age;
	let femax = 0;
	let felabel = '';
	for (const i in fage) {
		if (i !== 'count') {
			if (fage[i] > femax) {
				femax = fage[i];
				felabel = i;
			}
		}
	}
	const mage = mdata.male.age;
	let memax = 0;
	let melabel = '';
	for (const i in mage) {
		if (i !== 'count') {
			if (mage[i] > memax) {
				memax = mage[i];
				melabel = i;
			}
		}
	}
	const data2 = {
		female: mdata.female.count,
		male: mdata.male.count,
		femaxc: femax,
		femaxl: felabel,
		memaxc: memax,
		memaxl: melabel,
	};

	return (
		<ChartWrapper>
			<StaticsTitle>{`${region} 전체 통계 요약`}</StaticsTitle>
			<StaticsBox newData={data2} />
			<StatsArea>
				<OverallResponseRate statData={data1} />
				<GenderResponseRate statData={mdata} />
			</StatsArea>
		</ChartWrapper>
	);
}

export default Chart;
