interface DataForm {
	userName: string;
	age: string;
	email: string;
	address: string;
	answer: string;
	gender: string;
}

function answerF() {
	const data = ['네', '아니요', '글세요'];
	let k = Math.random();
	const q = 0.1 * Math.random() - 0.05;
	if (k <= 0.33 + q) {
		k = 0;
	} else if (k <= 0.66 + q) {
		k = 1;
	} else {
		k = 2;
	}

	return data[k];
}

function addressF() {
	let ans = '';
	const a = [
		'서울특별시',
		'부산광역시',
		'대구광역시',
		'인천광역시',
		'광주광역시',
		'대전광역시',
		'울산광역시',
		'세종특별자치시',
		'경기도',
		'강원도',
		'충청북도',
		'충청남도',
		'전라북도',
		'전라남도',
		'경상북도',
		'경상남도',
		'제주특별자치도',
	];
	const b = [
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
	];

	const ac = Math.random();

	const k = [
		0.184, 0.249, 0.295, 0.352, 0.38, 0.408, 0.43, 0.437, 0.7, 0.73, 0.761, 0.802, 0.837, 0.872, 0.923, 0.987, 1,
	];
	const k2 = [
		0.015, 0.028, 0.051, 0.081, 0.117, 0.153, 0.194, 0.239, 0.27, 0.304, 0.357, 0.407, 0.439, 0.478, 0.525, 0.585,
		0.627, 0.651, 0.691, 0.731, 0.783, 0.826, 0.882, 0.951, 1,
	];
	for (let i = 0; i < 17; i += 1) {
		if (ac <= k[i]) {
			ans += a[i];
			break;
		}
	}
	if (ac <= k[0]) {
		const bc = Math.random();
		for (let i = 0; i < 25; i += 1) {
			if (bc <= k2[i]) {
				ans += ` ${b[i]}`;
				break;
			}
		}
	}
	return ans;
}

function genderF() {
	const k = Math.random();
	return k > 0.5 + (Math.random() * 0.2 - 0.1) ? '남' : '여';
}
function ageF() {
	const k = 50 * (Math.random() * Math.random() + 0.3 * Math.random()) + 10;
	return `${Math.floor(k / 10) * 10}대`;
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
interface Data {
	[key: string]: SubData;
}

interface MapData {
	name: string;
	count: number;
	data: Data;
}

interface Sdata {
	[key: string]: MapData;
}

export default function randomPick(n: number) {
	const data: DataForm[] = [];
	const l = `${n}`.length;
	const sdata: Sdata = {
		전국: { name: '전국', count: 0, data: {} },
		서울: { name: '서울', count: 0, data: {} },
	};
	const s1 = sdata['전국'];
	const s2 = sdata['서울'];
	for (let i = 0; i < n; i += 1) {
		const p = String(i).padStart(l + 1, '0');
		data[i] = {
			userName: `name${p}`,
			gender: genderF(),
			age: ageF(),
			email: `email${p}@gmail.com`,
			address: addressF(),
			answer: answerF(),
		};
		const { gender, address, answer, age } = data[i];
		const adr = address.split(' ')[0];
		s1.count += 1;
		if (s1.data[adr] === undefined) {
			s1.data[adr] = {
				name: adr,
				count: 0,
				male: { count: 0, answer: { yes: 0, no: 0, so: 0 }, age: { count: 0 } },
				female: {
					count: 0,
					answer: { yes: 0, no: 0, so: 0 },
					age: { count: 0 },
				},
			};
		}
		s1.data[adr].count += 1;
		if (gender === '남') {
			s1.data[adr].male.count += 1;
			if (answer === '네') {
				s1.data[adr].male.answer.yes += 1;
			} else if (answer === '글세요') {
				s1.data[adr].male.answer.so += 1;
			} else {
				s1.data[adr].male.answer.no += 1;
			}
			s1.data[adr].male.age.count += 1;
			if (s1.data[adr].male.age[age] === undefined) {
				s1.data[adr].male.age[age] = 0;
			}
			s1.data[adr].male.age[age] += 1;
		} else {
			s1.data[adr].female.count += 1;
			if (answer === '네') {
				s1.data[adr].female.answer.yes += 1;
			} else if (answer === '글세요') {
				s1.data[adr].female.answer.so += 1;
			} else {
				s1.data[adr].female.answer.no += 1;
			}
			s1.data[adr].female.age.count += 1;
			if (s1.data[adr].female.age[age] === undefined) {
				s1.data[adr].female.age[age] = 0;
			}
			s1.data[adr].female.age[age] += 1;
		}

		if (adr === '서울특별시') {
			const adr2 = address.split(' ')[1];
			s2.count += 1;
			if (s2.data[adr2] === undefined) {
				s2.data[adr2] = {
					name: adr2,
					count: 0,
					male: {
						count: 0,
						answer: { yes: 0, no: 0, so: 0 },
						age: { count: 0 },
					},
					female: {
						count: 0,
						answer: { yes: 0, no: 0, so: 0 },
						age: { count: 0 },
					},
				};
			}
			s2.data[adr2].count += 1;
			if (gender === '남') {
				s2.data[adr2].male.count += 1;
				if (answer === '네') {
					s2.data[adr2].male.answer.yes += 1;
				} else if (answer === '글세요') {
					s2.data[adr2].male.answer.so += 1;
				} else {
					s2.data[adr2].male.answer.no += 1;
				}
				s2.data[adr2].male.age.count += 1;
				if (s2.data[adr2].male.age[age] === undefined) {
					s2.data[adr2].male.age[age] = 0;
				}
				s2.data[adr2].male.age[age] += 1;
			} else {
				s2.data[adr2].female.count += 1;
				if (answer === '네') {
					s2.data[adr2].female.answer.yes += 1;
				} else if (answer === '글세요') {
					s2.data[adr2].female.answer.so += 1;
				} else {
					s2.data[adr2].female.answer.no += 1;
				}
			}
			s2.data[adr2].female.age.count += 1;
			if (s2.data[adr2].female.age[age] === undefined) {
				s2.data[adr2].female.age[age] = 0;
			}
			s2.data[adr2].female.age[age] += 1;
		}
	}

	return { sdata, data };
}
