import issueLibrary from './DummyIssue';
import randomPick from './randomPick';

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
interface SmData {
	[key: string]: SubData;
}

interface RegionData {
	name: string;
	count: number;
	rate: number;
	color: string;
}

interface MapData {
	name: string;
	count: number;
	min: number;
	max: number;
	data: { [regionName: string]: RegionData };
	odata: SmData;
}

interface DbData {
	[key: string]: MapData;
}

interface DataForm {
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
	statsdata: DbData;
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

const colorSet = ['#9749B6', '#C181DB', '#C1ADD1', '#EEA3BF', '#FEDDD5', '#EAEAEA'];

export default function MockupMaker() {
	const data: DataForm[] = [];
	for (const issue of issueLibrary) {
		const totalcount = 1000 + 19000 * Math.random();
		const { sdata } = randomPick(totalcount);
		const dbinit: DbData = {
			전국: {
				name: '',
				count: 0,
				data: {},
				min: 100,
				max: 0,
				odata: { ...sdata['전국'].data },
			},
			서울특별시: {
				name: '',
				count: 0,
				data: {},
				min: 100,
				max: 0,
				odata: { ...sdata['서울특별시'].data },
			},
		};
		for (const name of ['전국', '서울특별시']) {
			const sub = dbinit[name];

			sub.name = name;
			sub.count = sdata[name].count;
			for (const i of names[name]) {
				const [count, rate] = [
					sdata[name].data[i].count,
					Number(((100 * sdata[name].data[i].count) / sub.count).toFixed(2)),
				];
				if (rate > sub.max) {
					sub.max = rate;
				}
				if (rate < sub.min) {
					sub.min = rate;
				}

				sub.data[`${i}`] = {
					name: i,
					count,
					rate,
					color: '',
				};
			}
			const dx = (Math.log(sub.max) - Math.log(sub.min)) / 5;
			for (const i of names[name]) {
				const { rate } = sub.data[`${i}`];
				let k = 5 - Math.floor((Math.log(rate) - Math.log(sub.min)) / dx);

				k = k < 0 ? 0 : k;
				sub.data[`${i}`].color = colorSet[k];
			}
		}
		data.push({ ...issue, statsdata: dbinit });
	}
	return data;
}
