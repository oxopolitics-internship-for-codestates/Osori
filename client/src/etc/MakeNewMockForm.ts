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
interface Data {
	[key: string]: SubData;
}
interface MapData {
	name: string;
	count: number;
	data: Data;
}

interface DbData {
	[key: string]: MapData;
}
const names: { [key: string]: string[] } = {
	전국: [
		'서울특별시',
		'부산광역시',
		'대구광역시',
		'인천광역시',
		'광주광역시',
		'대전광역시',
		'울산광역시',
		'경기도',
		'강원도',
		'충청북도',
		'충청남도',
		'전라북도',
		'전라남도',
		'경상북도',
		'경상남도',
		'제주특별자치도',
		'세종특별자치시',
	],
	서울특별시: [
		'종로구',
		'중구',
		'용산구',
		'성동구',
		'광진구',
		'동대문구',
		'중랑구',
		'성북구',
		'강북구',
		'도봉구',
		'노원구',
		'은평구',
		'서대문구',
		'마포구',
		'양천구',
		'강서구',
		'구로구',
		'금천구',
		'영등포구',
		'동작구',
		'관악구',
		'서초구',
		'강남구',
		'송파구',
		'강동구',
	],
};

export default function MakeNewMockForm() {
	const sdata: DbData = {
		전국: { name: '전국', count: 0, data: {} },
		서울특별시: { name: '서울특별시', count: 0, data: {} },
	};
	const s1 = sdata['전국'];
	for (const name of names['전국']) {
		s1.data[name] = {
			name,
			count: 0,
			male: { count: 0, answer: { yes: 0, no: 0, so: 0 }, age: { count: 0 } },
			female: {
				count: 0,
				answer: { yes: 0, no: 0, so: 0 },
				age: { count: 0 },
			},
		};
	}
	const s2 = sdata['서울특별시'];
	for (const name of names['서울특별시']) {
		s2.data[name] = {
			name,
			count: 0,
			male: { count: 0, answer: { yes: 0, no: 0, so: 0 }, age: { count: 0 } },
			female: {
				count: 0,
				answer: { yes: 0, no: 0, so: 0 },
				age: { count: 0 },
			},
		};
	}
	return sdata;
}
