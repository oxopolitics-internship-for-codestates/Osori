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
	data: SmData;
}

interface DbData {
	[key: string]: MapData;
}
interface Tdata {
	[key: string]: DbData;
}

interface DataForm {
	id: string;
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
	answer?: string;
}

export default function MockupMaker() {
	const data: DataForm[] = [];
	const statsdata: Tdata = {};
	let c = 0;
	for (const issue of issueLibrary) {
		const totalcount = 1000 + 19000 * Math.random();
		const { sdata } = randomPick(totalcount);
		const id = `issue${String(c).padStart(8, '0')}`;
		data.unshift({ id, ...issue, answer: undefined });
		statsdata[id] = sdata;
		c += 1;
	}
	return { issuedata: data, statsdata };
}
