interface User {
	userName: string;
	gender: string;
	age: string;
	address: string;
	answer: string;
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
export default function CountNewUser(user: User, data: Sdata) {
	const { gender, address, answer, age } = user;
	const adr = address.split(' ')[0];
	const s1 = data['전국'];
	const s2 = data['서울특별시'];
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
